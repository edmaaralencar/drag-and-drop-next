import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import classNames from "classnames";
import React, { useEffect } from "react";

import { Handle } from "./handle";
import styles from "./item.module.scss";
import { Remove } from "./remove";
import Image from "next/image";
import { Clock } from "lucide-react";

export interface Props {
  dragOverlay?: boolean;
  color?: string;
  disabled?: boolean;
  dragging?: boolean;
  handle?: boolean;
  handleProps?: any;
  height?: number;
  index?: number;
  fadeIn?: boolean;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  style?: React.CSSProperties;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
  value: React.ReactNode;
  onRemove?(): void;
}

export const Item = React.memo(
  React.forwardRef<HTMLLIElement, Props>(
    (
      {
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        sorting,
        style,
        transition,
        transform,
        value,
        wrapperStyle,
        ...props
      },
      ref
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return (
        <li
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(", "),
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": index,
              "--color": color,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={classNames(
              styles.Item,
              "border border-border justify-between flex flex-col w-full bg-background",
              dragging && styles.dragging,
              handle && styles.withHandle,
              dragOverlay && styles.dragOverlay,
              disabled && styles.disabled,
              color && styles.color
            )}
            style={style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            <div className="relative w-full h-[240px]">
              <Image src="/image.jpeg" alt="teste" fill />
            </div>
            <div className="p-4 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-lg text-foreground">{value}</span>
                <span className="text-sm text-muted-foreground whitespace-normal">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id
                  iusto?
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground">Progresso</span>

                <div className="rounded bg-muted h-2 w-full relative">
                  <div className="absolute w-1/2 bg-primary h-2"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Clock size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Prazo acaba em 3 dias.
                  </span>
                </div>

                <div className="flex gap-1">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image src="/image.jpeg" alt="teste" fill />
                  </div>
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image src="/image.jpeg" alt="teste" fill />
                  </div>
                </div>
              </div>
              {/* <span>
                {onRemove ? (
                  <Remove className={styles.Remove} onClick={onRemove} />
                ) : null}
                {handle ? <Handle {...handleProps} {...listeners} /> : null}
              </span> */}
            </div>
          </div>
        </li>
      );
    }
  )
);

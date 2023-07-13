"use client";
import classNames from "classnames";
import React, { forwardRef } from "react";

import styles from "./container.module.scss";
import { Handle } from "./item/handle";
import { Remove } from "./item/remove";

export interface ContainerProps {
  children: React.ReactNode;
  label?: string;
  style?: React.CSSProperties;
  horizontal?: boolean;
  hover?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  scrollable?: boolean;
  shadow?: boolean;
  placeholder?: boolean;
  unstyled?: boolean;
  onClick?(): void;
  onRemove?(): void;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    }: ContainerProps,
    ref
  ) => {
    const Component = onClick ? "button" : "div";

    return (
      <Component
        {...props}
        ref={ref as any}
        style={
          {
            ...style,
          } as React.CSSProperties
        }
        className={classNames(
          "flex flex-col overflow-hidden appearance-none outline-none min-w-[250px] m-[10px] rounded-md min-h-[300px] transition-colors border border-black/5 text-md bg-[#f6f6f6]",
          unstyled && "bg-transparent overflow-visible",
          horizontal && styles.horizontal,
          hover && "bg-[rgb(235,235,235,1)]",
          placeholder &&
            "py-[18px] px-5 flex items-center justify-center w-full cursor-pointer border border-dashed border-black/10 text-black/40",
          shadow && styles.shadow
        )}
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <div className="flex items-center justify-between bg-white pr-2 px-5 py-[5px] rounded-t-[5px] border-b-[rgba(0,0,0,0.08)] border-b border-solid hover:border-b-black/20">
            {label}
            <div className={styles.Actions}>
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} />
            </div>
          </div>
        ) : null}
        {placeholder ? (
          children
        ) : (
          <ul
            className={classNames(
              "grid gap-[10px] list-none p-4",
              scrollable && "overflow-y-auto max-h-[85vh]"
            )}
          >
            {children}
          </ul>
        )}
      </Component>
    );
  }
);
Container.displayName = "Container";

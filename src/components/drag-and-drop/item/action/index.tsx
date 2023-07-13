"use client";
import React, { forwardRef, CSSProperties } from "react";
import classNames from "classnames";

import styles from "./action.module.scss";

export interface ActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: {
    fill: string;
    background: string;
  };
  cursor?: CSSProperties["cursor"];
}

const ActionWithoutRef: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  ActionProps
> = ({ active, className, cursor, style, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className={classNames(styles.Action, className)}
      tabIndex={0}
      style={
        {
          ...style,
          cursor,
          "--fill": active?.fill,
          "--background": active?.background,
        } as CSSProperties
      }
    >
      {children}
    </button>
  );
};

ActionWithoutRef.displayName = "Action";

export const Action = forwardRef(ActionWithoutRef);

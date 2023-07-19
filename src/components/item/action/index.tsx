"use client";
import React, { forwardRef, CSSProperties } from "react";
import classNames from "classnames";

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
      className={classNames("p-2 fill-[#919eab] hover:bg-muted rounded-md", className)}
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

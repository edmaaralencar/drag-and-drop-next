import { forwardRef, ReactNode } from "react";
import { Remove } from "./item/remove";
import { Handle } from "./item/handle";
import { cn } from "@/lib/utils";

export type ListProps = {
  children: ReactNode;
  style: React.CSSProperties;
  label: string;
  horizontal?: boolean;
  handleProps?: React.HTMLAttributes<any>;
  hover?: boolean;
  scrollable?: boolean;
  onRemove?: () => void;
};

const ListWithoutRef: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ListProps
> = (
  {
    children,
    style,
    label,
    horizontal,
    onRemove,
    handleProps,
    hover,
    scrollable = false,
  },
  ref
) => {
  return (
    <div
      ref={ref}
      style={{
        ...style,
      }}
      className={cn(
        "border border-border flex flex-col overflow-hidden appearance-none outline-none min-w-[300px] rounded-md min-h-[300px] transition-colors text-md",
        horizontal && "w-full",
        hover && "border-2"
        // hover && "bg-[rgb(235,235,235,1)]"
        // shadow && styles.shadow
      )}
    >
      <div className="flex items-center justify-between border-b border-border pr-2 px-5 py-3 rounded-t-[5px] ">
        {label}
        <div className="flex gap-2">
          {onRemove && <Remove onClick={onRemove} />}
          <Handle {...handleProps} />
        </div>
      </div>
      <ul
        className={cn(
          "grid gap-[10px] list-none p-4",
          scrollable && "overflow-y-auto max-h-[85vh]",
          horizontal && "grid-flow-col"
        )}
      >
        {children}
      </ul>
    </div>
  );
};

ListWithoutRef.displayName = "Action";

export const List = forwardRef(ListWithoutRef);

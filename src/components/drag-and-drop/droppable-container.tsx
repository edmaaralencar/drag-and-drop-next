"use client";
import { UniqueIdentifier } from "@dnd-kit/core";
import {
  AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { List, ListProps } from "../list";

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

export interface IItem {
  id: UniqueIdentifier;
  name: string;
  index: number;
}

export type DroppableContainerProps = {
  disabled?: boolean;
  id: UniqueIdentifier;
  items: IItem[];
  style?: React.CSSProperties;
} & Omit<ListProps, "style">;

export function DroppableContainer({
  children,
  disabled,
  id,
  items,
  style,
  label,
  ...props
}: DroppableContainerProps) {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id,
    data: {
      type: "container",
      children: items,
    },
    animateLayoutChanges,
  });

  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== "container") ||
      items.some((item) => item.id === over.id)
    : false;

  return (
    <List
      ref={disabled ? undefined : setNodeRef}
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined,
      }}
      hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners,
      }}
      label={label}
      {...props}
    >
      {children}
    </List>
  );
}

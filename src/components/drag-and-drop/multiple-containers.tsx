"use client";

import {
  CancelDrop,
  CollisionDetection,
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardCoordinateGetter,
  KeyboardSensor,
  MeasuringStrategy,
  Modifiers,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  SortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { use, useCallback, useEffect, useRef, useState } from "react";
import { createPortal, unstable_batchedUpdates } from "react-dom";
import { coordinateGetter as multipleContainersCoordinateGetter } from "./multipleContainersKeyboardCoordinates";
import { createRange, getColor } from "./utils";
import { DroppableContainer, IItem } from "./droppable-container";
import { SortableItem } from "./sortable-item";
import { Item } from "../item";
import { Trash } from "./trash";
import { Container } from "./container";
import { useAddTaskModal } from "@/hooks/use-add-task-modal-hook";
import { useAddColumnModal } from "@/hooks/use-add-column-modal-hook";
import { ItemResponse } from "@/app/page";

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

type Items = Record<
  UniqueIdentifier,
  Array<{ id: UniqueIdentifier; name: string; index: number }>
>;

interface Props {
  adjustScale?: boolean;
  cancelDrop?: CancelDrop;
  columns?: number;
  containerStyle?: React.CSSProperties;
  coordinateGetter?: KeyboardCoordinateGetter;
  getItemStyles?(args: {
    value: UniqueIdentifier;
    index: number;
    overIndex: number;
    isDragging: boolean;
    containerId: UniqueIdentifier;
    isSorting: boolean;
    isDragOverlay: boolean;
  }): React.CSSProperties;
  wrapperStyle?(args: { index: number }): React.CSSProperties;
  itemCount?: number;
  items: ItemResponse[];
  handle?: boolean;
  strategy?: SortingStrategy;
  modifiers?: Modifiers;
  minimal?: boolean;
  trashable?: boolean;
  scrollable?: boolean;
  vertical?: boolean;
}

export const TRASH_ID = "void";
const PLACEHOLDER_ID = "placeholder";
const empty: IItem[] = [];

export default function MultipleContainers({
  adjustScale = false,
  cancelDrop,
  handle = false,
  containerStyle,
  coordinateGetter = multipleContainersCoordinateGetter,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  minimal = false,
  items: initialItems,
  modifiers,
  strategy = verticalListSortingStrategy,
  trashable = false,
  vertical = false,
  scrollable,
}: Props) {
  const addTaskModalStore = useAddTaskModal();
  const addColumnModalStore = useAddColumnModal();

  const [items, setItems] = useState<Items>(() => {
    if (initialItems) {
      const result = initialItems.reduce(
        (acc: Items, item: ItemResponse) => {
          acc[item.column] = acc[item.column] || [];
          acc[item.column].push({
            id: item.id,
            name: item.name,
            index: item.index,
          });
          return acc;
        },
        Object.create(null)
      );
      for (const property in result) {
        result[property].sort((a, b) => a.index - b.index);
      }
      return result;
    } else {
      return {
        "to-do": [
          { id: 11231, name: "Task 1", index: 0 },
          { id: 23412, name: "Task 2", index: 1 },
        ],
        "in-progress": [
          { id: 123, name: "Task 3", index: 0 },
          { id: 456, name: "Task 4", index: 1 },
        ],
      };
    }
  });
  const [containers, setContainers] = useState(
    Object.keys(items) as UniqueIdentifier[]
  );
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in items
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, "id");

      if (overId != null) {
        if (overId === TRASH_ID) {
          // If the intersecting droppable is the trash, return early
          // Remove this if you're not using trashable functionality in your app
          return intersections;
        }

        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.find((item) => item.id === container.id)
                // containerItems.includes(container.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, items]
  );
  const [clonedItems, setClonedItems] = useState<Items | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    })
  );

  const findContainer = (id: UniqueIdentifier) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) =>
      items[key].find((item) => item.id === id)
    );
  };

  const getIndex = (id: UniqueIdentifier) => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].findIndex((item) => item.id === id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containers
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  async function handleAddTask(
    containerId: UniqueIdentifier,
    taskName: string
  ) {
    const response = await fetch("/items", {
      method: "POST",
      body: JSON.stringify({
        name: taskName,
        index: items[containerId].length,
        column: containerId,
      }),
    });

    const data = await response.json();

    if (data.item) {
      setItems((items) => ({
        ...items,
        [containerId]: [
          ...items[containerId],
          {
            id: data.item.id,
            name: data.item.name,
            index: data.item.index,
          },
        ],
      }));
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setClonedItems(items);
      }}
      onDragOver={async ({ active, over }) => {
        const overId = over?.id;

        if (overId == null || overId === TRASH_ID || active.id in items) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          const activeItems = items[activeContainer];
          const overItems = items[overContainer];
          const overIndex = overItems.findIndex((item) => item.id === overId);
          const activeIndex = activeItems.findIndex(
            (item) => item.id === active.id
          );

          let newIndex: number;

          if (overId in items) {
            newIndex = overItems.length + 1;
          } else {
            const isBelowOverItem =
              over &&
              active.rect.current.translated &&
              active.rect.current.translated.top >
                over.rect.top + over.rect.height;

            const modifier = isBelowOverItem ? 1 : 0;

            newIndex =
              overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
          }

          recentlyMovedToNewContainer.current = true;

          const finishedArray = [
            ...items[overContainer].slice(0, newIndex),
            items[activeContainer][activeIndex],
            ...items[overContainer].slice(
              newIndex,
              items[overContainer].length
            ),
          ].map((item, index) => ({ ...item, index }));

          const newItems = {
            ...items,
            [activeContainer]: items[activeContainer]
              .filter((item) => item.id !== active.id)
              .map((item, index) => ({ ...item, index })),
            [overContainer]: finishedArray,
          };

          setItems((items) => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.findIndex((item) => item.id === overId);
            const activeIndex = activeItems.findIndex(
              (item) => item.id === active.id
            );

            let newIndex: number;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.top >
                  over.rect.top + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            const finishedArray = [
              ...items[overContainer].slice(0, newIndex),
              items[activeContainer][activeIndex],
              ...items[overContainer].slice(
                newIndex,
                items[overContainer].length
              ),
            ].map((item, index) => ({ ...item, index }));

            return {
              ...items,
              [activeContainer]: items[activeContainer]
                .filter((item) => item.id !== active.id)
                .map((item, index) => ({ ...item, index })),
              [overContainer]: finishedArray,
            };
          });

          await fetch("/items", {
            method: "PATCH",
            body: JSON.stringify(newItems),
          });
        }
      }}
      onDragEnd={async ({ active, over }) => {
        if (active.id in items && over?.id) {
          setContainers((containers) => {
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);

            return arrayMove(containers, activeIndex, overIndex);
          });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (overId == null) {
          setActiveId(null);
          return;
        }

        if (overId === TRASH_ID) {
          await fetch(`/items/${activeId}`, {
            method: "DELETE",
          });
          setItems((items) => ({
            ...items,
            [activeContainer]: items[activeContainer].filter(
              (item) => item.id !== activeId
            ),
          }));
          setActiveId(null);
          return;
        }

        const overContainer = findContainer(overId);

        if (overContainer) {
          const activeIndex = items[activeContainer].findIndex(
            (item) => item.id === active.id
          );
          const overIndex = items[overContainer].findIndex(
            (item) => item.id === overId
          );

          if (activeIndex !== overIndex) {
            const newArray = {
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              ).map((item, index) => ({ ...item, index })),
            };

            setItems((items) => {
              return {
                ...items,
                [overContainer]: arrayMove(
                  items[overContainer],
                  activeIndex,
                  overIndex
                ).map((item, index) => ({ ...item, index })),
              };
            });

            await fetch("/items", {
              method: "PATCH",
              body: JSON.stringify(newArray),
            });
          }
        }

        setActiveId(null);
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <div
        style={{
          display: "inline-grid",
          boxSizing: "border-box",
          padding: 20,
          gridAutoFlow: vertical ? "row" : "column",
        }}
      >
        <SortableContext
          items={[...containers, PLACEHOLDER_ID]}
          strategy={
            vertical
              ? verticalListSortingStrategy
              : horizontalListSortingStrategy
          }
        >
          {containers.map((containerId) => (
            <DroppableContainer
              key={containerId}
              id={containerId}
              label={minimal ? undefined : `${containerId}`}
              items={items[containerId]}
              scrollable={scrollable}
              style={containerStyle}
              unstyled={minimal}
              onRemove={() => handleRemove(containerId)}
            >
              <SortableContext items={items[containerId]} strategy={strategy}>
                {items[containerId].map((value, index) => {
                  return (
                    <SortableItem
                      disabled={isSortingContainer}
                      key={value.id}
                      id={value.id}
                      index={index}
                      handle={handle}
                      style={getItemStyles}
                      wrapperStyle={wrapperStyle}
                      containerId={containerId}
                      getIndex={getIndex}
                      name={value.name}
                    />
                  );
                })}
                <div
                  onClick={() =>
                    addTaskModalStore.onOpen(containerId, handleAddTask)
                  }
                  className="py-[18px] px-5 flex items-center justify-center w-full cursor-pointer border border-dashed border-black/10 text-black/40 hover:border-b-black/30"
                >
                  + Add Task
                </div>
              </SortableContext>
            </DroppableContainer>
          ))}
          {minimal ? undefined : (
            <div
              onClick={() => {
                addColumnModalStore.onOpen(handleAddColumn);
              }}
              className="py-[18px] min-w-[300px] px-5 flex items-center justify-center cursor-pointer border border-dashed border-black/10 text-black/40 hover:border-b-black/30"
            >
              + Add Column
            </div>
            // <DroppableContainer
            //   id={PLACEHOLDER_ID}
            //   disabled={isSortingContainer}
            //   items={empty}
            //   onClick={handleAddColumn}
            //   placeholder
            // >
            //   + Add column
            // </DroppableContainer>
          )}
        </SortableContext>
      </div>
      {typeof window === "object" &&
        createPortal(
          <DragOverlay adjustScale={adjustScale} dropAnimation={dropAnimation}>
            {activeId
              ? containers.includes(activeId)
                ? renderContainerDragOverlay(activeId)
                : renderSortableItemDragOverlay(activeId)
              : null}
          </DragOverlay>,
          document?.body
        )}
      {trashable && activeId && !containers.includes(activeId) ? (
        <Trash id={TRASH_ID} />
      ) : null}
    </DndContext>
  );

  function renderSortableItemDragOverlay(id: UniqueIdentifier) {
    const listWithItem = Object.values(items)
      .map((column) => {
        const teste = column.find((test) => test.id === id);

        if (teste) {
          return teste;
        } else {
          return null;
        }
      })
      .filter((value) => value !== null);

    return (
      <Item
        value={listWithItem[0]?.name}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id) as UniqueIdentifier,
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true,
        })}
        color={getColor(id)}
        wrapperStyle={wrapperStyle({ index: 0 })}
        dragOverlay
      />
    );
  }

  function renderContainerDragOverlay(containerId: UniqueIdentifier) {
    return (
      <Container
        label={`Column ${containerId}`}
        style={{
          height: "100%",
        }}
        shadow
        unstyled={false}
      >
        {items[containerId].map((item, index) => (
          <Item
            key={item.id}
            value={item.name}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(item.id),
              value: item.name,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false,
            })}
            color={getColor(item.id)}
            wrapperStyle={wrapperStyle({ index })}
          />
        ))}
      </Container>
    );
  }

  function handleRemove(containerID: UniqueIdentifier) {
    setContainers((containers) =>
      containers.filter((id) => id !== containerID)
    );
  }

  function handleAddColumn(colunmName: string) {
    const newContainerId = getNextContainerId();

    unstable_batchedUpdates(() => {
      setContainers((containers) => [...containers, colunmName]);
      setItems((items) => ({
        ...items,
        [colunmName]: [],
      }));
    });
  }

  function getNextContainerId() {
    const containerIds = Object.keys(items);
    const lastContainerId = containerIds[containerIds.length - 1];

    return String.fromCharCode(lastContainerId.charCodeAt(0) + 1);
  }
}

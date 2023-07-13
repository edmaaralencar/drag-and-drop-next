import { MultipleContainers } from "@/components/drag-and-drop/multiple-containers";
import { UniqueIdentifier } from "@dnd-kit/core";

export type ItemResponse = {
  id: UniqueIdentifier;
  name: string;
  index: number;
  column: string;
};

export default function Home() {
  const response = [
    { id: 11231, name: "Task 1", index: 1, column: "to-do" },
    { id: 23412, name: "Task 2", index: 0, column: "to-do" },
    { id: 123, name: "Task 3", index: 3, column: "in-progress" },
    { id: 456, name: "Task 6", index: 2, column: "in-progress" },
    { id: 4234, name: "Task 5", index: 0, column: "in-progress" },
    { id: 4523, name: "Task 4", index: 1, column: "in-progress" },
  ];

  return (
    <main className="flex min-h-screen">
      <MultipleContainers items={response} scrollable />
    </main>
  );
}

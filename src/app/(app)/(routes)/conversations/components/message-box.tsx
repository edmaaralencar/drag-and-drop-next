import { cn } from "@/lib/utils";

type MessageBoxProps = {
  type: "left" | "right";
};

export function MessageBox({ type }: MessageBoxProps) {
  return (
    <div
      className={cn(
        "w-full flex",
        type === "left" ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "flex gap-2",
          type === "left" ? "flex-row" : "flex-row-reverse"
        )}
      >
        <div className="w-10 h-10 bg-red-500 rounded-full"></div>
        <div
          className={cn(
            "flex-1 p-3 rounded-md max-w-md text-sm leading-normal",
            type === "left" ? "bg-border/80" : "border border-border"
          )}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
          doloremque ipsum voluptatum expedita debitis cum modi enim repellat
          laudantium! Recusandae ad qui adipisci cumque dolore. Voluptatem
          dolores odit quaerat veritatis?
        </div>
      </div>
    </div>
  );
}

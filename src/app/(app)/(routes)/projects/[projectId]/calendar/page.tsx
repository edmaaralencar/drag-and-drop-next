import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

export default function Page() {
  return (
    <main className="flex flex-col gap-2">
      <div className="border border-border rounded-md grid grid-cols-7 gap-2 py-2 px-3">
        <span className="text-muted-foreground">SEG</span>
        <span className="text-muted-foreground">SEG</span>
        <span className="text-muted-foreground">SEG</span>
        <span className="text-muted-foreground">SEG</span>
        <span className="text-muted-foreground">SEG</span>
        <span className="text-muted-foreground">SEG</span>
        <span className="text-muted-foreground">SEG</span>
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-7 gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div key={item} className="flex flex-col gap-3">
              <div className="h-[2px] bg-muted w-full"></div>
              <span>{item}</span>

              <div className="flex flex-col gap-2">
                {item < 2 && (
                  <div className="border border-border w-full rounded-lg flex items-center cursor-pointer gap-2 p-4">
                    <div className="w-8 h-8 rounded-full bg-red-500"></div>
                    <span>Task X</span>
                  </div>
                )}
                {item < 4 && (
                  <div className="border border-border w-full rounded-lg flex items-center cursor-pointer gap-2 p-4">
                    <div className="w-8 h-8 rounded-full bg-red-500"></div>
                    <span>Task X</span>
                  </div>
                )}
                <div className="border border-border w-full rounded-lg flex items-center cursor-pointer gap-2 p-4">
                  <div className="w-8 h-8 rounded-full bg-red-500"></div>
                  <span>Task X</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <div key={item} className="flex flex-col gap-3">
              <div className="h-[2px] bg-muted w-full"></div>
              <span>{item}</span>

              <div className="flex flex-col gap-2">
                {item < 2 && (
                  <div className="border border-border w-full rounded-lg flex items-center cursor-pointer gap-2 p-4">
                    <div className="w-8 h-8 rounded-full bg-red-500"></div>
                    <span>Task X</span>
                  </div>
                )}
                {item < 4 && (
                  <div className="border border-border w-full rounded-lg flex items-center cursor-pointer gap-2 p-4">
                    <div className="w-8 h-8 rounded-full bg-red-500"></div>
                    <span>Task X</span>
                  </div>
                )}
                <div className="border border-border w-full rounded-lg flex items-center cursor-pointer gap-2 p-4">
                  <div className="w-8 h-8 rounded-full bg-red-500"></div>
                  <span>Task X</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

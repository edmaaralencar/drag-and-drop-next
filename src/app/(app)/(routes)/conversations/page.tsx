import { Input } from "@/components/ui/input";
import { MessageBox } from "./components/message-box";

export default function Page() {
  return (
    <main className="flex-1 flex flex-col border border-border rounded-md">
      <header className="flex items-center justify-between p-4">
        <div className="flex gap-2">
          <div className="w-10 h-10 bg-red-500 rounded-full"></div>
          <div className="flex flex-col gap-1">
            <span className="text-sm">Edmar Alencar</span>
            <small className="text-xs text-muted-foreground">Product</small>
          </div>
        </div>
      </header>

      <div className="border-t border-border p-4 flex-1 flex flex-col gap-2">
        <div className="h-full flex flex-col gap-4 overflow-y-auto max-h-[500px] pb-4">
          <MessageBox type="left" />
          <MessageBox type="right" />
          <MessageBox type="right" />
          <MessageBox type="left" />
          <MessageBox type="left" />
          <MessageBox type="left" />
        </div>

        <Input className="w-full py-7" placeholder="Escreva uma mensagem" />
      </div>
    </main>
  );
}

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";

export default function Page({ searchParams }: { searchParams: any }) {
  return (
    <main className="flex flex-col gap-4">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg">Tasks completas</CardTitle>
            <Check className="p-1 rounded-full border border-border w-7 h-7" />
          </CardHeader>

          <CardFooter>
            <CardTitle>100</CardTitle>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg">Tasks incompletas</CardTitle>
            <Check className="p-1 rounded-full border border-border w-7 h-7" />
          </CardHeader>

          <CardFooter>
            <CardTitle>100</CardTitle>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg">Passaram do prazo</CardTitle>
            <Check className="p-1 rounded-full border border-border w-7 h-7" />
          </CardHeader>

          <CardFooter>
            <CardTitle>100</CardTitle>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg">Total</CardTitle>
            <Check className="p-1 rounded-full border border-border w-7 h-7" />
          </CardHeader>

          <CardFooter>
            <CardTitle>100</CardTitle>
          </CardFooter>
        </Card>
      </div>

      <div className="p-4 border border-border w-full flex flex-col gap-6 rounded-md">
        <header className="flex items-center justify-between">
          <h2 className="text-2xl">Report de task por membro</h2>

          <DatePickerDemo />
        </header>
        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger value="account">Trabalhando</TabsTrigger>
            <TabsTrigger value="password">Completas</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-10">
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-[1fr_200px] px-3">
                <span className="text-muted-foreground">Membro</span>
                <span className="text-center text-muted-foreground">
                  Quantidade de Tasks
                </span>
              </div>

              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-[1fr_200px] px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-500"></div>
                    <span className="text-sm">Edmar Alencar</span>
                  </div>
                  <span className="text-center">5</span>
                </div>
                <div className="grid grid-cols-[1fr_200px] px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-500"></div>
                    <span className="text-sm">Edmar Alencar</span>
                  </div>
                  <span className="text-center">5</span>
                </div>
                <div className="grid grid-cols-[1fr_200px] px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-500"></div>
                    <span className="text-sm">Edmar Alencar</span>
                  </div>
                  <span className="text-center">5</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

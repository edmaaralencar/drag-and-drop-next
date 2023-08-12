"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateProjectModal } from "@/hooks/use-project-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Select } from "../select";
import { CreatableSelect } from "../creatable-select";
import { useToast } from "../ui/use-toast";
import { formatDate } from "@/lib/date";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nome do projeto obrigatório.",
  }),
  client: z.string().min(1, {
    message: "Cliente obrigatório.",
  }),
  deadlineDate: z.date({
    required_error: "Prazo do projeto obrigatório.",
  }),
  tags: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .array()
    .nonempty({
      message: "Selecione pelo menos 1 tag.",
    }),
  priority: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { required_error: "Prioridade do projeto obrigatório." }
  ),
});

export function CreateProjectModal() {
  const createProjectModalStore = useCreateProjectModal();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      client: "",
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.post("/api/projects", {
        name: values.name,
        deadlineDate: values.deadlineDate,
        client: values.client,
        priority: values.priority,
        tags: values.tags,
      });

      router.refresh();
      createProjectModalStore.onClose();
      toast({
        title: "Projeto criado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Ocorreu um erro.",
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Crie seu projeto"
      description="Desfrute dos poderes do seu novo gerenciador de projetos."
      isOpen={createProjectModalStore.isOpen}
      onClose={createProjectModalStore.onClose}
    >
      <div>
        <div className="py-2 pb-4">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome do projeto</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="EProject"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Edmar Alencar"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadlineDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Prazo</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              formatDate(field.value, "PPP")
                            ) : (
                              <span>Escolha a data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) =>
                          //   date > new Date() || date < new Date("1900-01-01")
                          // }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <CreatableSelect
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Selecione uma tag"
                      multiple
                      options={[
                        { value: "Front-end", label: "Front-end" },
                        { value: "Back-end", label: "Back-end" },
                        { value: "Full-stack", label: "Full-stack" },
                      ]}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridade</FormLabel>
                    <Select
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Selecione a prioridade"
                      options={[
                        { value: "Alta", label: "Alta" },
                        { value: "Média", label: "Média" },
                        { value: "Baixa", label: "Baixa" },
                      ]}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-stretch justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={createProjectModalStore.onClose}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button disabled={loading} type="submit">
                  Criar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

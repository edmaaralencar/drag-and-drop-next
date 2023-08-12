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
import { Button } from "@/components/ui/button";
import { useToast } from "../ui/use-toast";
import { useCreateConversationModal } from "@/hooks/use-conversation-modal";
import { Select } from "../select";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nome do projeto obrigatório.",
  }),
  client: z.string().min(1, {
    message: "Cliente obrigatório.",
  }),
  user: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { required_error: "Prioridade do projeto obrigatório." }
  ),
});

type CreateConversationModal = {
  members: { user: { name: string | null; id: string } }[];
};

export function CreateConversationModal({ members }: CreateConversationModal) {
  const createConversationModalStore = useCreateConversationModal();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      client: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      // await axios.post("/api/projects", {
      //   name: values.name,
      //   deadlineDate: values.deadlineDate,
      //   client: values.client,
      //   priority: values.priority,
      //   tags: values.tags,
      // });

      router.refresh();
      // createConversationModalStore.onClose();
      // toast({
      //   title: "Projeto criado com sucesso.",
      // });
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
      title="Crie uma nova conversa"
      description="Converse com membros dos seus projetos."
      isOpen={createConversationModalStore.isOpen}
      onClose={createConversationModalStore.onClose}
    >
      <div>
        <div className="py-2 pb-4">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
                    <Select
                      onChange={field.onChange}
                      value={field.value}
                      placeholder="Selecione o usuário"
                      options={members.map((item) => ({
                        value: item.user.id,
                        label: item.user.name as string,
                      }))}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-stretch justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={createConversationModalStore.onClose}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button disabled={loading} type="submit">
                  Criar conversa
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}

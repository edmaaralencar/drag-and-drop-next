"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useAddMemberModal } from "@/hooks/use-add-member";
import { CreatableSelect } from "../creatable-select";
import axios from "axios";
import { useParams } from "next/navigation";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nome do membro obrigatório.",
  }),
  email: z.string().email({ message: "E-mail inválido." }).min(1, {
    message: "E-mail do membro obrigatório.",
  }),
  occupation: z.object(
    {
      value: z.string(),
      label: z.string(),
    },
    { required_error: "Cargo do membro obrigatório." }
  ),
});

export function AddMemberModal() {
  const addMemberModalStore = useAddMemberModal();
  const params = useParams();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      await axios.post("/api/invitations", {
        userName: values.name,
        userEmail: values.email,
        occupation: values.occupation.label,
        projectId: params.projectId,
      });

      addMemberModalStore.onClose();
      toast({
        title: "Convite enviado com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Ocorreu um erro",
        description: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      title="Adicione um membro"
      description="Envie um convite para pessoas trabalharem com você."
      isOpen={addMemberModalStore.isOpen}
      onClose={addMemberModalStore.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <div>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Edmar"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="teste@gmail.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cargo</FormLabel>
                      <CreatableSelect
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="Escolhe um cargo"
                        options={[
                          { value: "Dev Front-end", label: "Dev Front-end" },
                          { value: "Dev Back-end", label: "Dev Back-end" },
                          { value: "Dev Full-stack", label: "Dev Full-stack" },
                        ]}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={addMemberModalStore.onClose}
                  >
                    Cancelar
                  </Button>
                  <Button disabled={loading} type="submit">
                    Adicionar
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

"use client";

import * as React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Nome obrigatório.",
  }),
  email: z.string().min(1, {
    message: "Email obrigatório.",
  }),
  password: z.string().min(1, {
    message: "Senha obrigatória.",
  }),
});

export function UserAuthForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      const invitationId = searchParams.get("invitationId");

      await axios.post("/api/users", {
        name: values.name,
        email: values.email,
        password: values.password,
        invitationId: invitationId ? invitationId : null,
      });

      router.push("/sign-in");
    } catch (error: any) {
      console.log(error);
      if (error.response.data.message) {
        toast({
          title: "Ocorreu um erro.",
          description: error.response.data.message,
        });
      } else {
        toast({
          title: "Ocorreu um erro.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Nome" {...field} />
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="******"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={loading} type="submit">
          Criar
        </Button>
      </form>
    </Form>
  );
}

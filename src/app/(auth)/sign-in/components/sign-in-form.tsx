"use client";

import * as React from "react";

import { signIn } from "next-auth/react";

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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email obrigatório.",
  }),
  password: z.string().min(1, {
    message: "Senha obrigatória.",
  }),
});

export function UserAuthForm() {
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);

      signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
        .then((callback) => {
          setLoading(false);

          if (callback?.ok) {
            toast({
              title: "Login realizado com sucesso.",
              description: "Você será redirecionado para a tela inicial.",
            });

            setTimeout(() => {
              router.push("/");
            }, 300);
          }

          if (callback?.error) {
            toast({
              title: "Credenciais inválidas.",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // window.location.assign(`/${response.data.project.id}`);
    } catch (error) {
      // toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
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
                  type="password"
                  placeholder="teste@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={loading} type="submit">
          Login
        </Button>
      </form>
    </Form>
  );

  // return <div className={cn("grid gap-6", className)} {...props}></div>
}

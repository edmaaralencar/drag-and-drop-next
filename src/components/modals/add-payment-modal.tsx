"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
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
import axios from "axios";
import { useAddPaymentModal } from "@/hooks/use-add-payment";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date";

const formSchema = z.object({
  value: z.coerce.number().min(1, {
    message: "Valor do pagamento obrigatório.",
  }),
  payment_method: z.string().min(1, {
    message: "Método do pagamento obrigatório.",
  }),
  date: z.date({
    required_error: "Data do pagamento obrigatória.",
  }),
});

export function AddPaymentModal() {
  const params = useParams();
  const addPaymentModalStore = useAddPaymentModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: 0,
      payment_method: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await axios.post("/api/payments", {
        payment_method: values.payment_method,
        value: Number(values.value),
        date: values.date,
        projectId: params.projectId,
      });

      router.refresh();

      // window.location.assign(`/${response.data.project.id}`);
    } catch (error) {
      // toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Adicione um invoice"
      description="Adicione um invoice para ficar em dia com seus pagamentos."
      isOpen={addPaymentModalStore.isOpen}
      onClose={addPaymentModalStore.onClose}
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
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="R$ 300,00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forma de pagamento</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Pix"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data do pagamento</FormLabel>
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
                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                  <Button
                    disabled={loading}
                    variant="outline"
                    onClick={addPaymentModalStore.onClose}
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
      </div>
    </Modal>
  );
}

"use client";

import { useAddPaymentModal } from "@/hooks/use-add-payment";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export function PaymentsHeader() {
  const paymentModalStore = useAddPaymentModal();

  return (
    <header className="flex justify-between items-center">
      <h2 className="text-lg">Lista de pagamentos</h2>

      <Button onClick={paymentModalStore.onOpen} size="sm" className="gap-1">
        Adicionar
        <Plus className="w-4 h-4" />
      </Button>
    </header>
  );
}

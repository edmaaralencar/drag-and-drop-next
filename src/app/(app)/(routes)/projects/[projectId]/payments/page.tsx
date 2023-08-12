import { PaymentsHeader } from "@/components/payments-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/date";
import prisma from "@/lib/prisma";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default async function Page({
  params,
}: {
  params: { projectId: string };
}) {
  const payments = await prisma.payment.findMany({
    where: {
      projectId: params.projectId,
    },
  });

  const formattedPayments = payments.map((item) => ({
    ...item,
    value: new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(item.value),
  }));

  return (
    <main className="flex flex-col gap-6">
      <PaymentsHeader />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[360px]">ID</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Método</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {formattedPayments.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.id}</TableCell>
              <TableCell>{formatDate(invoice.date, "dd/MM/yyyy")}</TableCell>
              <TableCell>{invoice.payment_method}</TableCell>
              <TableCell className="text-right">{invoice.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const invoices = [
  {
    id: "INV-001",
    date: "March 01, 2026",
    status: "Paid",
    amount: "$29.00",
    method: "Visa •••• 4242",
  },
  {
    id: "INV-002",
    date: "February 01, 2026",
    status: "Paid",
    amount: "$29.00",
    method: "Visa •••• 4242",
  },
  {
    id: "INV-003",
    date: "January 01, 2026",
    status: "Paid",
    amount: "$29.00",
    method: "Visa •••• 4242",
  },
  {
    id: "INV-004",
    date: "December 01, 2025",
    status: "Paid",
    amount: "$29.00",
    method: "Visa •••• 4242",
  },
];

export function PaymentHistory() {
  return (
    <Card className="border-none shadow-sm shadow-sm bg-card hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-success/10 text-success border-none">
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell>{invoice.method}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="hover:text-primary">
                    <Download className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

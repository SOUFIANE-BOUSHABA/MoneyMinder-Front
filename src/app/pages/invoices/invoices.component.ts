// src/app/pages/invoices/invoices.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Invoice {
  id: string;
  date: string;
  dueDate: string;
  client: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod?: 'CreditCard' | 'BankTransfer' | 'Cash';
}

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'invoices.component.html'
})
export class InvoicesComponent {
  invoices: Invoice[] = [
    {
      id: 'INV-2024-001',
      date: '2024-02-11',
      dueDate: '2024-03-11',
      client: 'Acme Corp',
      amount: 5000,
      status: 'Pending',
      paymentMethod: 'CreditCard'
    },
    {
      id: 'INV-2024-002',
      date: '2024-02-10',
      dueDate: '2024-03-10',
      client: 'Wayne Enterprises',
      amount: 7500,
      status: 'Paid',
      paymentMethod: 'BankTransfer'
    },
    // Add more invoices as needed
  ];
}

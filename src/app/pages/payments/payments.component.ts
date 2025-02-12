// src/app/pages/payments/payments.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Payment {
  id: string;
  date: string;
  invoiceId: string;
  client: string;
  amount: number;
  method: 'CreditCard' | 'BankTransfer' | 'Cash';
  status: 'Pending' | 'Completed' | 'Failed';
}

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'payments.component.html'

})
export class PaymentsComponent {
  payments: Payment[] = [
    {
      id: 'PAY-2024-001',
      date: '2024-02-11',
      invoiceId: 'INV-2024-001',
      client: 'Acme Corp',
      amount: 5000,
      method: 'CreditCard',
      status: 'Completed'
    },
    {
      id: 'PAY-2024-002',
      date: '2024-02-10',
      invoiceId: 'INV-2024-002',
      client: 'Wayne Enterprises',
      amount: 7500,
      method: 'BankTransfer',
      status: 'Pending'
    },
    // Add more payments as needed
  ];
}

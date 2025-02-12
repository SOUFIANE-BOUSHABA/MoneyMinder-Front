// src/app/pages/transactions/transactions.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  type: 'income' | 'expense';
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  account: string;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'transactions.component.html'
})
export class TransactionsComponent {
  transactions: Transaction[] = [
    {
      id: 1,
      date: '2024-02-11',
      description: 'Salary Deposit',
      category: 'Salary',
      type: 'income',
      amount: 5000,
      status: 'Completed',
      account: 'Main Account'
    },
    {
      id: 2,
      date: '2024-02-10',
      description: 'Grocery Shopping',
      category: 'Food & Dining',
      type: 'expense',
      amount: -120.50,
      status: 'Completed',
      account: 'Credit Card'
    },
    // Add more transactions as needed
  ];
}

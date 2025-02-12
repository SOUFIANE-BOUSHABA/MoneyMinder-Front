// src/app/pages/account/account.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'Checking' | 'Savings' | 'Investment';
  status: 'Active' | 'Inactive' | 'Frozen';
  lastTransaction: string;
}

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'Credit' | 'Debit';
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'accounts.component.html'
})
export class AccountComponent {
  transactions: Transaction[] = [
    {
      id: '1',
      date: '2024-02-12',
      description: 'Salary Deposit',
      amount: 5000,
      type: 'Credit'
    },
    {
      id: '2',
      date: '2024-02-11',
      description: 'Online Purchase - Amazon',
      amount: 129.99,
      type: 'Debit'
    },
    {
      id: '3',
      date: '2024-02-11',
      description: 'Restaurant Payment',
      amount: 45.50,
      type: 'Debit'
    },
    {
      id: '4',
      date: '2024-02-10',
      description: 'Investment Return',
      amount: 350.25,
      type: 'Credit'
    },
    {
      id: '5',
      date: '2024-02-10',
      description: 'Utility Bill Payment',
      amount: 85.00,
      type: 'Debit'
    }
  ];
}

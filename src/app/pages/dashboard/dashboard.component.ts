// src/app/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'dashboard.component.html'

})
export class DashboardComponent {
  transactions = [
    {
      date: '2024-02-11',
      description: 'Salary Deposit',
      category: 'Income',
      amount: 5000,
      status: 'Completed'
    },
    {
      date: '2024-02-10',
      description: 'Grocery Shopping',
      category: 'Expenses',
      amount: -120.50,
      status: 'Completed'
    },
    // Add more transactions as needed
  ];
}

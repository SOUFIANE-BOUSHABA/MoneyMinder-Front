import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
interface Quote {
  id: string;
  date: string;
  validUntil: string;
  client: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
}
@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quotes.component.html'
})
export class QuotesComponent {

  quotes: Quote[] = [
    {
      id: 'QT-2024-001',
      date: '2024-02-11',
      validUntil: '2024-03-11',
      client: 'Acme Corp',
      amount: 5000,
      status: 'Sent'
    },
    {
      id: 'QT-2024-002',
      date: '2024-02-10',
      validUntil: '2024-03-10',
      client: 'Wayne Enterprises',
      amount: 7500,
      status: 'Accepted'
    },
    // Add more quotes as needed
  ];
}

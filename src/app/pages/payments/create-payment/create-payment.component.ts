import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

import { PaymentRequest } from '../../../core/models/payment.model';
import { PaymentService } from '../../../core/services/payment.service';
import { InvoiceService } from '../../../core/services/invoice.service';
import { QuoteService } from '../../../core/services/quote.service';
import { Invoice } from '../../../core/models/invoice.model';
import { Quote } from '../../../core/models/quote.model';

@Component({
  selector: 'app-create-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-payment.component.html',
})
export class CreatePaymentComponent implements OnInit {
  paymentRequest: PaymentRequest = {
    amount: 0,
    paymentDate: new Date(),
    method: 'CASH',
    invoiceId: undefined,
    quoteId: undefined,
  };

  invoices: Invoice[] = [];
  quotes: Quote[] = [];

  selectedInvoiceId: number | null = null;
  selectedQuoteId: number | null = null;

  constructor(
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    private quoteService: QuoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInvoices();
    this.loadQuotes();
  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe({
      next: (data) => {
        this.invoices = data;
      },
      error: (err) => console.error('Error loading invoices', err),
    });
  }

  loadQuotes(): void {
    this.quoteService.getAllQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
      },
      error: (err) => console.error('Error loading quotes', err),
    });
  }

  onInvoiceSelected(): void {
    if (this.selectedInvoiceId) {
      this.selectedQuoteId = null;
    }
  }

  onQuoteSelected(): void {
    if (this.selectedQuoteId) {
      this.selectedInvoiceId = null;
    }
  }

  createPayment(): void {
    this.paymentRequest.invoiceId = this.selectedInvoiceId || undefined;
    this.paymentRequest.quoteId = this.selectedQuoteId || undefined;

    this.paymentService.createPayment(this.paymentRequest).subscribe({
      next: (payment) => {
        this.showToast('success', 'Payment created successfully!');
        this.router.navigate(['/payments']);
      },
      error: (err) => {
        console.error('Error creating payment', err);
        this.showToast('error', 'Failed to create payment');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/payments']);
  }

  showToast(icon: any, text: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: icon,
      title: text
    });
  }
}

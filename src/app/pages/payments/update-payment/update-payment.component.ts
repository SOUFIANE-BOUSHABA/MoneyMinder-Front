
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Payment, PaymentRequest} from '../../../core/models/payment.model';
import { PaymentService } from '../../../core/services/payment.service';
import { Invoice } from '../../../core/models/invoice.model';
import { Quote } from '../../../core/models/quote.model';
import { InvoiceService } from '../../../core/services/invoice.service';
import { QuoteService } from '../../../core/services/quote.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-payment.component.html',
})
export class UpdatePaymentComponent implements OnInit {
  paymentId!: number;

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
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    private quoteService: QuoteService
  ) {}

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPayment();
    this.loadInvoices();
    this.loadQuotes();
  }

  loadPayment(): void {
    this.paymentService.getPaymentById(this.paymentId).subscribe({
      next: (payment: Payment) => {

        this.paymentRequest.amount = payment.amount;
        this.paymentRequest.paymentDate = new Date(payment.paymentDate);
        this.paymentRequest.method = payment.method;
        if (payment.invoiceNumber) {

          this.paymentRequest.invoiceId = payment.invoiceNumber ? payment.id : undefined;
          this.selectedInvoiceId = this.paymentRequest.invoiceId || null;
          this.paymentRequest.quoteId = undefined;
          this.selectedQuoteId = null;
        } else if (payment.quoteNumber) {
          this.paymentRequest.quoteId = payment.quoteNumber ? payment.id : undefined;
          this.selectedQuoteId = this.paymentRequest.quoteId || null;
          this.paymentRequest.invoiceId = undefined;
          this.selectedInvoiceId = null;
        }
      },
      error: (err) => {
        console.error('Error loading payment', err);
        this.showToast('error', 'Failed to load payment');
      },
    });
  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe({
      next: (data: Invoice[]) => {
        this.invoices = data;
      },
      error: (err) => console.error('Error loading invoices', err),
    });
  }

  loadQuotes(): void {
    this.quoteService.getAllQuotes().subscribe({
      next: (data: Quote[]) => {
        this.quotes = data;
      },
      error: (err) => console.error('Error loading quotes', err),
    });
  }

  onInvoiceSelected(): void {
    if (this.selectedInvoiceId !== null) {
      this.selectedQuoteId = null;
    }
  }

  onQuoteSelected(): void {
    if (this.selectedQuoteId !== null) {
      this.selectedInvoiceId = null;
    }
  }

  updatePayment(): void {
    this.paymentRequest.invoiceId = this.selectedInvoiceId || undefined;
    this.paymentRequest.quoteId = this.selectedQuoteId || undefined;

    this.paymentService.updatePayment(this.paymentId, this.paymentRequest).subscribe({
      next: (updatedPayment: Payment) => {
        this.showToast('success', 'Payment updated successfully!');
        this.router.navigate(['/payments']);
      },
      error: (err) => {
        console.error('Error updating payment', err);
        this.showToast('error', 'Failed to update payment');
      },
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

import { Component, OnInit } from '@angular/core';
import { Payment } from '../../core/models/payment.model';
import { PaymentService } from '../../core/services/payment.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.component.html',
})
export class PaymentsComponent implements OnInit {
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];

  totalPaymentsAmount: number = 0;
  cashTotal: number = 0;
  cardTotal: number = 0;
  transferTotal: number = 0;


  cashCount: number = 0;
  cardCount: number = 0;
  transferCount: number = 0;

  searchTerm: string = '';
  selectedMethod: string = 'all';


  paymentPercentageChange: number = 0;
  lastMonthPaymentTotal: number = 0;

  constructor(private paymentService: PaymentService, private router: Router) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getAllPaymentsForUser().subscribe({
      next: (data) => {
        this.payments = data;
        this.calculateStats();
        this.applyFilters();
        this.calculatePaymentPercentageChange();
      },
      error: (err) => console.error('Error loading payments', err),
    });
  }

  calculateStats(): void {
    this.totalPaymentsAmount = 0;
    this.cashTotal = 0;
    this.cardTotal = 0;
    this.transferTotal = 0;
    for (let payment of this.payments) {
      this.totalPaymentsAmount += payment.amount;
      if (payment.method === 'CASH') {
        this.cashTotal += payment.amount;
      } else if (payment.method === 'CARD') {
        this.cardTotal += payment.amount;
      } else if (payment.method === 'TRANSFER') {
        this.transferTotal += payment.amount;
      }
    }
  }

  applyFilters(): void {
    this.filteredPayments = this.payments.filter(p => {
      const matchesSearch = this.searchTerm
        ? (p.id?.toString().includes(this.searchTerm) ||
          p.paymentDate.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
        : true;
      const matchesMethod = this.selectedMethod === 'all'
        ? true
        : p.method.toLowerCase() === this.selectedMethod.toLowerCase();
      return matchesSearch && matchesMethod;
    });

    this.cashCount = this.filteredPayments.filter(p => p.method === 'CASH').length;
    this.cardCount = this.filteredPayments.filter(p => p.method === 'CARD').length;
    this.transferCount = this.filteredPayments.filter(p => p.method === 'TRANSFER').length;
  }

  recordPayment(): void {
    this.router.navigate(['/payments/create']);
  }

  editPayment(id: number): void {
    this.router.navigate(['/payments/edit', id]);
  }

  deletePayment(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This payment will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentService.deletePayment(id).subscribe({
          next: () => {
            this.showToast('success', 'Payment deleted successfully!');
            this.loadPayments();
          },
          error: (err) => {
            console.error('Error deleting payment', err);
            this.showToast('error', 'Failed to delete payment');
          }
        });
      }
    });
  }


  calculatePaymentPercentageChange(): void {
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(
      thisMonth.getFullYear(),
      thisMonth.getMonth() - 1,
      1
    );
    const endOfLastMonth = new Date(
      thisMonth.getFullYear(),
      thisMonth.getMonth(),
      0
    );

    let lastMonthSum = 0;
    for (let p of this.payments) {
      const pDate = new Date(p.paymentDate);
      if (pDate >= startOfLastMonth && pDate <= endOfLastMonth) {
        lastMonthSum += p.amount;
      }
    }
    this.lastMonthPaymentTotal = lastMonthSum;


    if (this.lastMonthPaymentTotal > 0) {
      this.paymentPercentageChange =
        ((this.totalPaymentsAmount - this.lastMonthPaymentTotal) /
          this.lastMonthPaymentTotal) *
        100;
    } else {

      if (this.totalPaymentsAmount > 0) {
        this.paymentPercentageChange = 100;
      } else {
        this.paymentPercentageChange = 0;
      }
    }
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

// src/app/pages/invoices/invoices.component.ts
import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../core/models/invoice.model';
import { InvoiceService } from '../../core/services/invoice.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from "sweetalert2";

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoices.component.html',
})
export class InvoicesComponent implements OnInit {
  invoices: Invoice[] = [];

  totalOutstanding: number = 0;
  overdueTotal: number = 0;
  paidTotal: number = 0;
  pendingTotal: number = 0;

  outstandingCount: number = 0;
  overdueCount: number = 0;
  paidCount: number = 0;
  pendingCount: number = 0;

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getAllInvoices().subscribe({
      next: (data) => {
        this.invoices = data;
        this.calculateStats();
      },
      error: (err) => console.error('Error loading invoices', err),
    });
  }

  calculateStats() {
    this.totalOutstanding = 0;
    this.overdueTotal = 0;
    this.paidTotal = 0;
    this.pendingTotal = 0;
    this.outstandingCount = 0;
    this.overdueCount = 0;
    this.paidCount = 0;
    this.pendingCount = 0;

    for (let inv of this.invoices) {
      if (inv.status === 'PENDING') {
        this.pendingTotal += inv.totalAmount;
        this.pendingCount++;
      } else if (inv.status === 'OVERDUE') {
        this.overdueTotal += inv.totalAmount;
        this.overdueCount++;
      } else if (inv.status === 'PAID') {
        this.paidTotal += inv.totalAmount;
        this.paidCount++;
      }
    }
    this.totalOutstanding = this.pendingTotal + this.overdueTotal;
    this.outstandingCount = this.pendingCount + this.overdueCount;
  }

  createInvoice() {
    this.router.navigate(['/invoices/create']);
  }

  editInvoice(id: number) {
    this.router.navigate(['/invoices/edit', id]);
  }





  alert(icon: any, text: any) {
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

  deleteInvoice(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "This invoice will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.invoiceService.deleteInvoice(id).subscribe({
          next: () => {
            console.log(`Invoice with ID ${id} deleted.`);
            this.loadInvoices();
            this.alert('success', 'Invoice deleted successfully!');
          },
          error: (err) => {
            console.error('Error deleting invoice', err);
            this.alert('error', 'Error deleting invoice');
          }
        });
      }
    });
  }






  downloadPdf(id: number) {
    this.invoiceService.downloadInvoicePdf(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice_${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('Error downloading invoice PDF', err),
    });
  }
}

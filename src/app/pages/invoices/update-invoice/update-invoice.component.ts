// src/app/pages/invoices/update-invoice/update-invoice.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../../core/services/invoice.service';
import {InvoiceRequest} from '../../../core/models/invoice.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-invoice.component.html',
})
export class UpdateInvoiceComponent implements OnInit {
  invoiceRequest: InvoiceRequest = {
    invoiceNumber: '',
    issueDate: new Date(),
    totalAmount: 0,
    status: 'PENDING'
  };

  invoiceId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) {}


  ngOnInit(): void {
    this.invoiceId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadInvoice();
  }


  loadInvoice(): void {
    this.invoiceService.getInvoiceById(this.invoiceId).subscribe({
      next: (invoice) => {
        this.invoiceRequest = {
          invoiceNumber: invoice.invoiceNumber,
          issueDate: new Date(invoice.issueDate),
          totalAmount: invoice.totalAmount,
          status: invoice.status
        };
      },
      error: (err) => {
        console.error('Error loading invoice', err);
        this.alert('error', 'Failed to load invoice');
      }
    });
  }


  updateInvoice(): void {
    this.invoiceService.updateInvoice(this.invoiceId, this.invoiceRequest).subscribe({
      next: (updatedInvoice) => {
        this.alert('success', 'Invoice updated successfully!');
        this.router.navigate(['/invoices']);
      },
      error: (err) => {
        console.error('Error updating invoice', err);
        this.alert('error', 'Failed to update invoice');
      }
    });
  }


  cancel(): void {
    this.router.navigate(['/invoices']);
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

}

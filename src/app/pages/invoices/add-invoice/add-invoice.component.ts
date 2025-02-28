import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../../../core/services/invoice.service';
import {InvoiceRequest} from '../../../core/models/invoice.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-invoice.component.html',
})
export class AddInvoiceComponent implements OnInit {

  invoiceRequest: InvoiceRequest = {
    invoiceNumber: '',
    issueDate: new Date(),
    totalAmount: 0,
    status: 'PENDING'
  };

  constructor(private invoiceService: InvoiceService, private router: Router) {}

  ngOnInit(): void {}

  createInvoice(): void {
    this.invoiceService.createInvoice(this.invoiceRequest).subscribe({
      next: (invoice) => {
        this.alert('success', 'Invoice created successfully!');
        this.router.navigate(['/invoices']);
      },
      error: (err) => {
        console.error('Error creating invoice', err);
        this.alert('error', 'Failed to create invoice');
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteService } from '../../../core/services/quote.service';
import { QuoteRequest } from '../../../core/models/quote.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-quote.component.html',
})
export class AddQuoteComponent implements OnInit {
  quoteRequest: QuoteRequest = {
    quoteNumber: '',
    issueDate: new Date(),
    totalAmount: 0,
    status: 'DRAFT'
  };

  constructor(private quoteService: QuoteService, private router: Router) {}

  ngOnInit(): void {}

  createQuote(): void {
    this.quoteService.createQuote(this.quoteRequest).subscribe({
      next: (quote) => {
        this.showToast('success', 'Quote created successfully!');
        this.router.navigate(['/quotes']);
      },
      error: (err) => {
        console.error('Error creating quote', err);
        this.showToast('error', 'Failed to create quote');
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/quotes']);
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

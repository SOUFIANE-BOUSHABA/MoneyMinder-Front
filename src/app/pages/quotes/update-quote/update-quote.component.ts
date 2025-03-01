import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../../../core/services/quote.service';
import { QuoteRequest } from '../../../core/models/quote.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-quote.component.html',
})
export class UpdateQuoteComponent implements OnInit {
  quoteId!: number;
  quoteRequest: QuoteRequest = {
    quoteNumber: '',
    issueDate: new Date(),
    totalAmount: 0,
    status: 'DRAFT',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quoteService: QuoteService
  ) {}

  ngOnInit(): void {
    this.quoteId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuote();
  }

  loadQuote(): void {
    this.quoteService.getQuoteById(this.quoteId).subscribe({
      next: (quote) => {
        this.quoteRequest = {
          quoteNumber: quote.quoteNumber,
          issueDate: new Date(quote.issueDate),
          totalAmount: quote.totalAmount,
          status: quote.status,
        };
      },
      error: (err) => {
        console.error('Error loading quote', err);
        this.showToast('error', 'Failed to load quote');
      },
    });
  }

  updateQuote(): void {
    this.quoteService.updateQuote(this.quoteId, this.quoteRequest).subscribe({
      next: (updatedQuote) => {
        this.showToast('success', 'Quote updated successfully!');
        this.router.navigate(['/quotes']);
      },
      error: (err) => {
        console.error('Error updating quote', err);
        this.showToast('error', 'Failed to update quote');
      },
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
      },
    });
    Toast.fire({
      icon: icon,
      title: text,
    });
  }
}

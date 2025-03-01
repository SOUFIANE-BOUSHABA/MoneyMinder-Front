import { Component, OnInit } from '@angular/core';
import { Quote } from '../../core/models/quote.model';
import { QuoteService } from '../../core/services/quote.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quotes.component.html',
})
export class QuotesComponent implements OnInit {
  quotes: Quote[] = [];
  filteredQuotes: Quote[] = [];


  activeTotal: number = 0;
  activeCount: number = 0;
  acceptedThisMonthTotal: number = 0;
  acceptedThisMonthCount: number = 0;
  rejectedTotal: number = 0;
  rejectedCount: number = 0;
  draftTotal: number = 0;
  draftCount: number = 0;


  searchTerm: string = '';
  selectedStatus: string = 'all';

  constructor(private quoteService: QuoteService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.quoteService.getAllQuotes().subscribe({
      next: (data) => {
        this.quotes = data;
        this.calculateStats();
        this.applyFilters();
      },
      error: (err) => console.error('Error loading quotes', err),
    });
  }

  calculateStats(): void {

    this.activeTotal = 0;
    this.activeCount = 0;
    this.acceptedThisMonthTotal = 0;
    this.acceptedThisMonthCount = 0;
    this.rejectedTotal = 0;
    this.rejectedCount = 0;
    this.draftTotal = 0;
    this.draftCount = 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    for (let quote of this.quotes) {
      if (quote.status === 'DRAFT') {
        this.draftTotal += quote.totalAmount;
        this.draftCount++;
      } else {
        this.activeTotal += quote.totalAmount;
        this.activeCount++;
      }
      if (quote.status === 'ACCEPTED') {
        const issueDate = new Date(quote.issueDate);
        if (issueDate.getMonth() === currentMonth && issueDate.getFullYear() === currentYear) {
          this.acceptedThisMonthTotal += quote.totalAmount;
          this.acceptedThisMonthCount++;
        }
      }
      if (quote.status === 'REJECTED') {
        this.rejectedTotal += quote.totalAmount;
        this.rejectedCount++;
      }
    }
  }

  applyFilters(): void {
    this.filteredQuotes = this.quotes.filter(q => {
      const matchesSearch = this.searchTerm
        ? q.quoteNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;
      const matchesStatus = this.selectedStatus === 'all'
        ? true
        : q.status.toLowerCase() === this.selectedStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }

  createQuote(): void {
    this.router.navigate(['/quotes/create']);
  }

  editQuote(id: number): void {
    this.router.navigate(['/quotes/edit', id]);
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



  deleteQuote(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This quote will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.quoteService.deleteQuote(id).subscribe({
          next: () => {
            console.log(`Quote with ID ${id} deleted.`);
            this.loadQuotes();
            this.showToast('success', 'Quote deleted successfully!');
          },
          error: (err) => {
            console.error('Error deleting quote', err);
            this.showToast('error', 'Failed to delete quote');
          }
        });
      }
    });
  }

  downloadPdf(id: number): void {
    this.quoteService.generateAndSendQuotePdf(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quote_${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('Error downloading quote PDF', err),
    });
  }
}

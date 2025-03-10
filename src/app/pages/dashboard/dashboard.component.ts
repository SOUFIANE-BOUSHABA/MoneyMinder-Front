import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StatisticsService } from '../../core/services/statistics.service';
import { StatisticsVM } from '../../core/models/statistics.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  statistics!: StatisticsVM;
  errorMsg = '';

  COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6', '#6b7280', '#9ca3af'];

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.errorMsg = '';

    this.statisticsService.getStatistics().subscribe({
      next: (data) => {
        this.statistics = data;
      },
      error: (error) => {
        console.error('Error loading statistics:', error);
        this.errorMsg = 'Failed to load dashboard data. Please try again later.';
      },
    });
  }

  objectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }

  getTotalInvoices(): number {
    if (!this.statistics?.invoiceStatus) return 0;
    return Object.values(this.statistics.invoiceStatus).reduce((sum, count) => sum + count, 0);
  }

  getTotalQuotes(): number {
    if (!this.statistics?.quoteStatus) return 0;
    return Object.values(this.statistics.quoteStatus).reduce((sum, count) => sum + count, 0);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  }

  getNetIncome(): number {
    if (!this.statistics?.incomeExpense) return 0;
    const income = this.statistics.incomeExpense['INCOME'] || 0;
    const expense = this.statistics.incomeExpense['EXPENSE'] || 0;
    return income - expense;
  }

}

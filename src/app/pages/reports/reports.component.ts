import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../core/services/report.service';
import { FinancialReport } from '../../core/models/financial-report.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html'
})
export class ReportsComponent implements OnInit {
  reports: FinancialReport[] = [];


  lastMonthlyReportDate?: Date;
  lastAnnualReportDate?: Date;

  constructor(private reportService: ReportService, private router: Router) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.reportService.getAllReportsForUser().subscribe({
      next: (data) => {
        this.reports = data;
        this.findMostRecentDates();
      },
      error: (err) => console.error('Error loading reports', err)
    });
  }


  private findMostRecentDates(): void {
    const monthlyReports = this.reports
      .filter(r => r.reportType === 'MONTHLY')
      .sort((a, b) => new Date(b.generationDate).getTime() - new Date(a.generationDate).getTime());
    if (monthlyReports.length > 0) {
      this.lastMonthlyReportDate = new Date(monthlyReports[0].generationDate);
    }

    const annualReports = this.reports
      .filter(r => r.reportType === 'ANNUAL')
      .sort((a, b) => new Date(b.generationDate).getTime() - new Date(a.generationDate).getTime());
    if (annualReports.length > 0) {
      this.lastAnnualReportDate = new Date(annualReports[0].generationDate);
    }
  }


  public timeAgo(date?: Date): string {
    if (!date) {
      return 'Never generated';
    }
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      return 'Today';
    } else if (diffDays === 1) {
      return '1 day ago';
    } else if (diffDays < 30) {
      return diffDays + ' days ago';
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return years === 1 ? '1 year ago' : `${years} years ago`;
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  GoToGenerate(): void {
    this.router.navigate(['/reports/create']);
  }

  downloadReport(report: FinancialReport): void {
    this.reportService.downloadReport(report.id).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = report.title.replace(/\s/g, '_') + '.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => console.error('Error downloading report', err)
    });
  }
}

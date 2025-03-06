
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ReportService } from '../../../core/services/report.service';
import { FinancialReportRequest } from '../../../core/models/financial-report.model';

@Component({
  selector: 'app-generate-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-report.component.html'
})
export class GenerateReportComponent implements OnInit {
  reportRequest: FinancialReportRequest = {
    startDate: new Date(),
    endDate: new Date(),
    reportType: 'MONTHLY'
  };

  reportTypes = [
    { value: 'MONTHLY', label: 'Monthly' },
    { value: 'ANNUAL', label: 'Annual' }
  ];

  constructor(private reportService: ReportService, private router: Router) {}

  ngOnInit(): void {
  }

  generateReport(): void {
    this.reportService.generateFinancialReport(this.reportRequest).subscribe({
      next: (report) => {
        this.showToast('success', 'Report generated successfully!');
        this.router.navigate(['/reports']);
      },
      error: (err) => {
        console.error('Error generating report', err);
        if (err.error && typeof err.error === 'string' &&
          err.error.includes('monthly limit')) {
          this.showToast('error', 'You have reached your monthly limit for free plan. Upgrade to Premium for unlimited reports!');
        } else {
          this.showToast('error', 'Failed to generate report');
        }
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/reports']);
  }

  showToast(icon: any, text: any): void {
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

// src/app/pages/reports/reports.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Report {
  id: string;
  title: string;
  type: 'Monthly' | 'Quarterly' | 'Annual' | 'Custom';
  generatedDate: string;
  status: 'Ready' | 'Processing' | 'Failed';
  size: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'reports.component.html'
})
export class ReportsComponent {
  reports: Report[] = [
    {
      id: '1',
      title: 'February 2024 Financial Summary',
      type: 'Monthly',
      generatedDate: '2024-02-12',
      status: 'Ready',
      size: '2.4 MB'
    },
    {
      id: '2',
      title: 'Q4 2023 Performance Report',
      type: 'Quarterly',
      generatedDate: '2024-01-15',
      status: 'Ready',
      size: '4.8 MB'
    },
    {
      id: '3',
      title: 'Annual Financial Statement 2023',
      type: 'Annual',
      generatedDate: '2024-02-01',
      status: 'Ready',
      size: '8.2 MB'
    },
    {
      id: '4',
      title: 'Custom Tax Report',
      type: 'Custom',
      generatedDate: '2024-02-12',
      status: 'Processing',
      size: 'N/A'
    },
    {
      id: '5',
      title: 'Investment Portfolio Analysis',
      type: 'Custom',
      generatedDate: '2024-02-11',
      status: 'Failed',
      size: 'N/A'
    }
  ];
}

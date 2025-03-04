export interface FinancialReport {
  id: number;
  title: string;
  generationDate: Date;
  reportType: 'MONTHLY' | 'ANNUAL';
  filePath: string;
  fileSize: number;
  userId: number;
}

export interface FinancialReportRequest {
  startDate: Date;
  endDate: Date;
  reportType: 'MONTHLY' | 'ANNUAL';
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinancialReport , FinancialReportRequest } from '../models/financial-report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getAllReportsForUser(): Observable<FinancialReport[]> {
    return this.http.get<FinancialReport[]>(`${this.apiUrl}/user`);
  }

  getReportById(id: number): Observable<FinancialReport> {
    return this.http.get<FinancialReport>(`${this.apiUrl}/${id}`);
  }


  generateFinancialReport(request: FinancialReportRequest): Observable<FinancialReport> {
    return this.http.post<FinancialReport>(this.apiUrl, request);
  }

  downloadReport(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/download`, { responseType: 'blob' });
  }
}

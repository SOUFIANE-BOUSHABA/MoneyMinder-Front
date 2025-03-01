import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment, PaymentRequest } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  getAllPaymentsForUser(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/user`);
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  createPayment(request: PaymentRequest): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, request);
  }

  updatePayment(id: number, request: PaymentRequest): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${id}`, request);
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


}

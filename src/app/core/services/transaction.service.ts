import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction, TransactionRequest } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  createTransaction(transaction: TransactionRequest): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  updateTransaction(id: number, transaction: TransactionRequest): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.apiUrl}/${id}`, transaction);
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/account/${accountId}`);
  }

  getTotalIncome(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-income`);
  }

  getTotalExpenses(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total-expenses`);
  }

  getIncomeChangePercentage(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/income-change-percentage`);
  }

  getExpenseChangePercentage(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/expense-change-percentage`);
  }
}

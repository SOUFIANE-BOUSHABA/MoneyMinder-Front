
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account, AccountRequest } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api/accounts';

  constructor(private http: HttpClient) {}

  createAccount(account: AccountRequest): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }

  updateAccount(id: number, account: AccountRequest): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, account);
  }



  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/user`);
  }

  deleteAccount(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

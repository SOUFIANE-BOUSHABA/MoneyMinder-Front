import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription, SubscriptionRequest } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:8080/api/subscriptions';

  constructor(private http: HttpClient) {}

  requestSubscription(request: SubscriptionRequest): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.apiUrl}/request`, request);
  }

  getUserSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(this.apiUrl);
  }

  getPendingSubscriptions(): Observable<Subscription[]> {
    return this.http.get<Subscription[]>(`${this.apiUrl}/pending`);
  }

  approveSubscription(id: number): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiUrl}/approve/${id}`, {});
  }

  rejectSubscription(id: number): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.apiUrl}/reject/${id}`, {});
  }
}

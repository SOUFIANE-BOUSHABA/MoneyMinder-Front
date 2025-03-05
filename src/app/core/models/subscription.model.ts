export interface Subscription {
  id?: number;
  planName: string;
  status: 'PENDING' | 'ACTIVE' | 'EXPIRED' | 'REJECTED';
  startDate?: Date;
  price: number;
  endDate?: Date;
  requestDate?: Date;
}

export interface SubscriptionRequest {
  planId: number;
}

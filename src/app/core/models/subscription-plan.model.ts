export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  planType: 'FREE' | 'PREMIUM';
}

import { Component } from '@angular/core';


interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  billing: 'Monthly' | 'Annual';
  features: string[];
  isPopular?: boolean;
}

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [],
  templateUrl: './subscription.component.html'
})
export class SubscriptionComponent {

}

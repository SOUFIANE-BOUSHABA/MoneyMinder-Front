// src/app/pages/admin/subscription-requests/subscription-requests.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SubscriptionRequest {
  id: string;
  planId: string;
  name: string;
  email: string;
  company: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

@Component({
  selector: 'app-subscription-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'subscription-request.component.html'
})
export class SubscriptionRequestComponent implements OnInit {
  requests: SubscriptionRequest[] = [];

  ngOnInit() {

    this.requests = [
      {
        id: '1',
        planId: 'pro',
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Acme Inc',
        message: 'We need the professional plan for our growing team.',
        status: 'pending',
        createdAt: new Date('2024-02-10T10:00:00')
      },
      {
        id: '2',
        planId: 'basic',
        name: 'Jane Smith',
        email: 'jane@example.com',
        company: 'StartUp LLC',
        message: 'Looking for a basic plan to start with.',
        status: 'pending',
        createdAt: new Date('2024-02-11T14:30:00')
      },
      {
        id: '3',
        planId: 'enterprise',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        company: 'MegaCorp',
        message: 'Interested in the enterprise plan for our large organization.',
        status: 'approved',
        createdAt: new Date('2024-02-09T09:15:00')
      }
    ];
  }

  getPlanName(planId: string): string {
    const plans: { [key: string]: string } = {
      'basic': 'Basic',
      'pro': 'Professional',
      'enterprise': 'Enterprise'
    };
    return plans[planId] || 'Unknown Plan';
  }

  approveRequest(request: SubscriptionRequest) {
    request.status = 'approved';

    console.log(`Approved request: ${request.id}`);
  }

  rejectRequest(request: SubscriptionRequest) {
    request.status = 'rejected';

    console.log(`Rejected request: ${request.id}`);
  }
}

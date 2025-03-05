import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Subscription } from '../../../core/models/subscription.model';
import { SubscriptionService } from '../../../core/services/subscription.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-subscriptions',
  standalone: true,
  templateUrl: './manage-subscriptions.component.html',
  imports: [
    CommonModule
  ]
})
export class ManageSubscriptionsComponent implements OnInit {
  subscriptions: Subscription[] = [];

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.subscriptionService.getPendingSubscriptions().subscribe({
      next: (subs) => {
        this.subscriptions = subs;
      },
      error: (err) => console.error('Error loading subscriptions', err)
    });
  }

  approve(subscription: Subscription): void {
    this.subscriptionService.approveSubscription(subscription.id!).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Subscription approved!' });
        this.loadSubscriptions();
      },
      error: (err) => {
        console.error('Error approving subscription', err);
        Swal.fire({ icon: 'error', title: 'Failed to approve subscription' });
      }
    });
  }

  reject(subscription: Subscription): void {
    this.subscriptionService.rejectSubscription(subscription.id!).subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Subscription rejected!' });
        this.loadSubscriptions();
      },
      error: (err) => {
        console.error('Error rejecting subscription', err);
        Swal.fire({ icon: 'error', title: 'Failed to reject subscription' });
      }
    });
  }
}

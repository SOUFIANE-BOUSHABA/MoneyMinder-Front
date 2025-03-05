import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../../core/services/subscription.service';
import { Subscription, SubscriptionRequest } from '../../../core/models/subscription.model';
import { SubscriptionPlan } from '../../../core/models/subscription-plan.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscription-plans.component.html'
})
export class SubscriptionPlansComponent implements OnInit {
  currentSubscription: Subscription | null = null;

  subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 2,
      name: 'Forfait Gratuit',
      description: 'Suivi des revenus et dépenses. Génération de factures limitées (3 par mois). Accès aux rapports financiers de base.',
      price: 0,
      planType: 'FREE'
    },
    {
      id: 3,
      name: 'Plan Premium',
      description: 'Accès à des rapports avancés, support client prioritaire.',
      price: 49,
      planType: 'PREMIUM'
    }
  ];

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserSubscription();
  }

  loadUserSubscription(): void {
    this.subscriptionService.getUserSubscriptions().subscribe({
      next: (subs) => {
        if (subs.length > 0) {
          this.currentSubscription = subs[subs.length - 1];
        }
      },
      error: (err) => console.error('Error loading subscriptions', err)
    });
  }

  requestPlan(plan: SubscriptionPlan): void {
    const request: SubscriptionRequest = { planId: plan.id };
    this.subscriptionService.requestSubscription(request).subscribe({
      next: (sub) => {
        Swal.fire({
          icon: 'success',
          title: 'Subscription request sent!',
          showConfirmButton: false,
          timer: 1500
        });
        this.loadUserSubscription();
      },
      error: (err) => {
        console.error('Error requesting subscription', err);
        Swal.fire({
          icon: 'error',
          title: 'Failed to request subscription'
        });
      }
    });
  }




  shouldDisablePlan(plan: SubscriptionPlan): boolean {
    if (!this.currentSubscription) {
      return false;
    }
    if (this.currentSubscription.status === 'ACTIVE') {
      const now = new Date();
      if (this.currentSubscription.endDate) {
        const end = new Date(this.currentSubscription.endDate);
        if (end > now) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  }




  manageSubscription(): void {
    this.router.navigate(['/subscriptions/manage']);
  }
}

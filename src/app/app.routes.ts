import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component'

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { UsersComponent } from "./pages/users/users.component";
import { TransactionsComponent } from "./pages/transactions/transactions.component";
import { InvoicesComponent } from "./pages/invoices/invoices.component";
import { QuotesComponent } from "./pages/quotes/quotes.component";
import { PaymentsComponent } from "./pages/payments/payments.component";
import { SubscriptionComponent } from "./pages/subscription/subscription.component";
import { ReportsComponent } from "./pages/reports/reports.component";
import { AccountComponent } from "./pages/accounts/accounts.component";
import { SubscriptionRequestComponent } from "./pages/subscription-request/subscription-request.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import {CategoryComponent} from "./pages/category/category.component";
import {UpdateTransactionComponent} from "./pages/transactions/update-transaction/update-transaction.component";
import {AddTransactionComponent} from "./pages/transactions/add-transaction/add-transaction.component";

export const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'quotes', component: QuotesComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'account', component: AccountComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'subscription', component: SubscriptionComponent },
      { path: 'subscription-request', component: SubscriptionRequestComponent },
      { path: 'transactions/add', component: AddTransactionComponent },
      { path: 'transactions/edit/:id', component: UpdateTransactionComponent },
    ]
  }
];

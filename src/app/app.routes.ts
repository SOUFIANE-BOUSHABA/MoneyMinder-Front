import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component'

import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { TransactionsComponent } from "./pages/transactions/transactions.component";
import { InvoicesComponent } from "./pages/invoices/invoices.component";
import { QuotesComponent } from "./pages/quotes/quotes.component";
import { PaymentsComponent } from "./pages/payments/payments.component";
import { ReportsComponent } from "./pages/reports/reports.component";
import { AccountComponent } from "./pages/accounts/accounts.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import {CategoryComponent} from "./pages/category/category.component";
import {UpdateTransactionComponent} from "./pages/transactions/update-transaction/update-transaction.component";
import {AddTransactionComponent} from "./pages/transactions/add-transaction/add-transaction.component";
import {AddInvoiceComponent} from "./pages/invoices/add-invoice/add-invoice.component";
import {UpdateInvoiceComponent} from "./pages/invoices/update-invoice/update-invoice.component";
import {AddQuoteComponent} from "./pages/quotes/add-quote/add-quote.component";
import {UpdateQuoteComponent} from "./pages/quotes/update-quote/update-quote.component";
import {CreatePaymentComponent} from "./pages/payments/create-payment/create-payment.component";
import {UpdatePaymentComponent} from "./pages/payments/update-payment/update-payment.component";
import {GenerateReportComponent} from "./pages/reports/generate-report/generate-report.component";
import {SubscriptionPlansComponent} from "./pages/subscriptions/subscription-plans/subscription-plans.component";
import {ManageSubscriptionsComponent} from "./pages/subscriptions/manage-subscriptions/manage-subscriptions.component";

export const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },


  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'categories', component: CategoryComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'transactions/add', component: AddTransactionComponent },
      { path: 'transactions/edit/:id', component: UpdateTransactionComponent },
      { path: 'invoices', component: InvoicesComponent },
      { path: 'invoices/create', component: AddInvoiceComponent },
      { path: 'invoices/edit/:id', component: UpdateInvoiceComponent },
      { path: 'quotes', component: QuotesComponent },
      { path: 'quotes/create', component: AddQuoteComponent },
      { path: 'quotes/edit/:id', component: UpdateQuoteComponent },
      { path: 'payments', component: PaymentsComponent },
      { path: 'payments/create', component: CreatePaymentComponent },
      { path: 'payments/edit/:id', component: UpdatePaymentComponent },


      { path: 'account', component: AccountComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'reports/create', component: GenerateReportComponent },

      { path: 'subscription', component: SubscriptionPlansComponent },
      { path: 'subscription-request', component: ManageSubscriptionsComponent },
    ]

  }
];

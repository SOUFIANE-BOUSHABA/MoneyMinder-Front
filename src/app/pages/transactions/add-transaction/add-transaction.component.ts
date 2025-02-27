import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../core/services/category.service';
import { AccountService } from '../../../core/services/account.service';
import { TransactionService } from '../../../core/services/transaction.service';

import { Category } from '../../../core/models/category.model';
import { Account } from '../../../core/models/account.model';
import { TransactionRequest } from '../../../core/models/transaction.model';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-transaction.component.html'
})
export class AddTransactionComponent implements OnInit {
  categories: Category[] = [];
  accounts: Account[] = [];

  transactionRequest: TransactionRequest = {
    date: new Date(),
    amount: 0,
    type: 'EXPENSE',
    categoryId: 0,
    accountId: 0,
    description: ''
  };

  constructor(
    private categoryService: CategoryService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadAccounts();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Error fetching categories', err)
    });
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => (this.accounts = data),
      error: (err) => console.error('Error fetching accounts', err)
    });
  }

  onSubmit() {
    this.transactionService.createTransaction(this.transactionRequest).subscribe({
      next: (created) => {
        console.log('Transaction created:', created);
        this.router.navigate(['/transactions']);
      },
      error: (err) => {
        console.error('Error creating transaction', err);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/transactions']);
  }
}

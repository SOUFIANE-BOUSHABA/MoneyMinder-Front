
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../../core/services/transaction.service';
import { CategoryService } from '../../../core/services/category.service';
import { AccountService } from '../../../core/services/account.service';
import { TransactionRequest, Transaction } from '../../../core/models/transaction.model';
import { Category } from '../../../core/models/category.model';
import { Account } from '../../../core/models/account.model';

@Component({
  selector: 'app-update-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-transaction.component.html'
})
export class UpdateTransactionComponent implements OnInit {
  transactionId!: number;

  transactionRequest: TransactionRequest = {
    date: new Date(),
    amount: 0,
    type: 'EXPENSE',
    categoryId: 0,
    accountId: 0,
    description: ''
  };

  categories: Category[] = [];
  accounts: Account[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.transactionId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTransaction();
    this.loadCategories();
    this.loadAccounts();
  }

  loadTransaction() {
    this.transactionService.getTransactionById(this.transactionId).subscribe({
      next: (data: Transaction) => {
        this.transactionRequest = {
          date: new Date(data.date),
          amount: data.amount,
          type: data.type,
          categoryId: data.categoryId,
          accountId: data.accountId,
          description: data.description
        };
      },
      error: (err) => console.error('Error fetching transaction', err)
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => this.categories = data,
      error: (err) => console.error('Error fetching categories', err)
    });
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (data) => this.accounts = data,
      error: (err) => console.error('Error fetching accounts', err)
    });
  }

  onSubmit() {
    this.transactionService.updateTransaction(this.transactionId, this.transactionRequest).subscribe({
      next: (updated) => {
        console.log('Transaction updated:', updated);
        this.router.navigate(['/transactions']);
      },
      error: (err) => console.error('Error updating transaction', err)
    });
  }

  onCancel() {
    this.router.navigate(['/transactions']);
  }
}

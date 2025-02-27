
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../core/services/transaction.service';
import { Transaction } from '../../core/models/transaction.model';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import {Route, Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule, FormsModule, AddTransactionComponent],
  templateUrl: 'transactions.component.html'
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];

  totalIncome: number = 0;
  totalExpenses: number = 0;
  incomeChangePercentage: number = 0;
  expenseChangePercentage: number = 0;
  pendingTransactions: number = 0;
  pendingAmount: number = 0;
  failedTransactions: number = 0;
  failedAmount: number = 0;

  searchTerm: string = '';
  selectedType: string = 'all';


  constructor(private transactionService: TransactionService , private router:Router) {}

  ngOnInit() {
    this.loadTransactions();
    this.loadStats();
  }

  loadTransactions() {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error fetching transactions', error);
      }
    });
  }

  loadStats() {
    this.transactionService.getTotalIncome().subscribe({
      next: (income) => this.totalIncome = income,
      error: (error) => console.error('Error fetching total income', error)
    });
    this.transactionService.getTotalExpenses().subscribe({
      next: (expenses) => this.totalExpenses = expenses,
      error: (error) => console.error('Error fetching total expenses', error)
    });
    this.transactionService.getIncomeChangePercentage().subscribe({
      next: (incomeChange) => this.incomeChangePercentage = incomeChange,
      error: (error) => console.error('Error fetching income change percentage', error)
    });
    this.transactionService.getExpenseChangePercentage().subscribe({
      next: (expenseChange) => this.expenseChangePercentage = expenseChange,
      error: (error) => console.error('Error fetching expense change percentage', error)
    });
  }



  deleteTransaction(id?: number) {
    if (!id) {
      console.error('Transaction ID is undefined, cannot delete.');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'This transaction will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.transactionService.deleteTransaction(id).subscribe({
          next: () => {
            console.log(`Transaction with ID ${id} deleted.`);
            this.loadTransactions();
            this.loadStats();

            this.alert("success" , "The transaction has been deleted.");

          },
          error: (error) => {

            this.alert("error" , "An error occurred while deleting the transaction" );
          }
        });
      }
    });
  }

  alert( icon:any ,  text :any ){

    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: icon,
      title: text
    });
  }

  applyFilters() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      return (
        (this.searchTerm === '' ||
          transaction.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          transaction.category?.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
        (this.selectedType === 'all' || transaction.type === this.selectedType)
      );
    });


  }


  goToAddTransaction() {
    this.router.navigate(['/transactions/add']);
  }

  goToEditTransaction(id: number) {
    this.router.navigate(['/transactions/edit', id]);
  }
}

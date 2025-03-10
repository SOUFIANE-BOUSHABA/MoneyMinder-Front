
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { Account, AccountRequest } from '../../core/models/account.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: 'accounts.component.html'
})
export class AccountComponent implements OnInit {




  allAccounts: Account[] = [];
  featuredAccounts: Account[] = [];
  showAddForm = false;
  isEditing = false;

  selectedAccount: AccountRequest = {
    accountName: '',
    balance: 0
  };

  editingId?: number;




  constructor(private accountService: AccountService) {}

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.allAccounts = accounts;
        this.updateFeaturedAccounts();
      },
      error: (error) => {
        this.showToast('error','Error loading accounts');
      }
    });
  }



  updateFeaturedAccounts() {
    this.featuredAccounts = this.getRandomAccounts(this.allAccounts, 3);
  }

  getRandomAccounts(accounts: Account[], count: number): Account[] {
    const shuffled = [...accounts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  generateFakeCardNumber(): string {
    return '**** **** **** ' + Math.floor(1000 + Math.random() * 9000).toString();
  }

  generateFakeExpDate(): string {
    const month = Math.floor(1 + Math.random() * 12).toString().padStart(2, '0');
    const year = (new Date().getFullYear() + Math.floor(1 + Math.random() * 5)).toString().slice(-2);
    return `${month}/${year}`;
  }



  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.isEditing = false;
    this.resetForm();
  }




  resetForm() {
    this.selectedAccount = {
      accountName: '',
      balance: 0
    };
    this.editingId = undefined;
  }





  saveAccount() {
    if (this.isEditing && this.editingId) {
      this.accountService.updateAccount(this.editingId, this.selectedAccount).subscribe({
        next: () => {
          this.showToast('success','Account updated successfully');
          this.loadAccounts();
          this.toggleAddForm();
        },
        error: () => {
          this.showToast('error','Error updating account');
        }
      });
    } else {



      this.accountService.createAccount(this.selectedAccount).subscribe({
        next: () => {
          this.showToast('success','Account created successfully');
          this.loadAccounts();
          this.toggleAddForm();
        },
        error: (err) => {
          if (err.error && typeof err.error === 'string' && err.error.includes('maximum of 2 accounts')) {
            this.showToast('warning', 'Free plan allows a maximum of 2 accounts. Please upgrade to Premium for more accounts.');
          } else {
            this.showToast('error', 'Error creating account');
          }
        }
      });
    }
  }




  editAccount(account: Account) {
    this.isEditing = true;
    this.editingId = account.id;
    this.selectedAccount = {
      accountName: account.accountName,
      balance: account.balance
    };
    this.showAddForm = true;
  }




  deleteAccount(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {




      if (result.isConfirmed) {
        this.accountService.deleteAccount(id).subscribe({
          next: () => {
            this.showToast( 'success','Account deleted successfully');
            this.loadAccounts();
          },
          error: () => {
            this.showToast( 'error','Error deleting account');
          }
        });
      }
    });
  }




  showToast(icon: 'success' | 'error' | 'warning', title: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
      icon,
      title,
    });
  }


}

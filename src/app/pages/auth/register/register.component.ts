import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { register } from '../../../store/auth/auth.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: 'register.component.html',
})
export class RegisterComponent {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;

  constructor(private store: Store, private router: Router) {}

  isFormValid(): boolean {
    return (
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.password === this.confirmPassword &&
      this.acceptTerms
    );
  }

  onSubmit() {
    if (!this.isFormValid()) {
      alert('Please fill all fields correctly and accept the terms.');
      return;
    }

    this.store.dispatch(
      register({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
      })
    );

    this.router.navigate(['/login']);
  }
}

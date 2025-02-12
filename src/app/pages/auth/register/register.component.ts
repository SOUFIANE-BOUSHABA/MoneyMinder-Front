// src/app/pages/auth/register/register.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl:'register.component.html'
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  company: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;

  constructor(private router: Router) {}

  isFormValid(): boolean {
    return (
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.email.trim() !== '' &&
      this.company.trim() !== '' &&
      this.password.trim() !== '' &&
      this.password === this.confirmPassword &&
      this.acceptTerms
    );
  }

  onSubmit() {
    if (this.isFormValid()) {
      // Here you would typically call your registration service
      console.log('Registration attempt:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        company: this.company
      });

      // For demo purposes, navigate to login
      this.router.navigate(['/login']);
    }
  }
}

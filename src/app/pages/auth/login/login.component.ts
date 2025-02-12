// src/app/pages/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl:'login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    // Here you would typically call your authentication service
    console.log('Login attempt:', { email: this.email, password: this.password, rememberMe: this.rememberMe });

    // For demo purposes, navigate to dashboard
    this.router.navigate(['/dashboard']);
  }
}

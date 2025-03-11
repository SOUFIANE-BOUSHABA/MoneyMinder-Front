
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {Store} from "@ngrx/store";
import {login} from "../../../store/auth/auth.actions";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl:'login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private store: Store) {}

  onSubmit() {
    this.store.dispatch(login({ email: this.email, password: this.password }));
  }
}

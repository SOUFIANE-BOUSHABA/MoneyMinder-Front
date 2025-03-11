
import {Component, Output, EventEmitter, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "@ngrx/store";
import {AuthState} from "../../core/models/auth.model";
import {logout} from "../../store/auth/auth.actions";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'header.component.html'
})
export class HeaderComponent implements OnInit{
  @Output() toggleSidebar = new EventEmitter<void>();
  isProfileOpen = false;


  fullName: string = '';
  role: string = '';

  constructor( private  store: Store<{ auth: AuthState }> , private authService: AuthService,  private router: Router) {}




  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      if (authState.user) {
        const { firstName, lastName, role } = authState.user;
        this.fullName = `${firstName} ${lastName}`.trim();
        this.role = role;
      } else {
        this.fullName = 'Guest';
        this.role = '—';
      }
    });
  }


logout() {
    this.store.dispatch(logout());
}


  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }
}

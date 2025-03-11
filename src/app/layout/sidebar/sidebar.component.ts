
import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Store} from "@ngrx/store";
import {AuthState} from "../../core/models/auth.model";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'sidebar.component.html'
})
export class SidebarComponent implements OnInit{
  @Input() isOpen = true;
  isCollapsed = false;
  isTransactionsOpen = false;


  fullName: string = '';
  role: string = '';

  constructor(private store: Store<{ auth: AuthState }>) {}




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



  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }


}

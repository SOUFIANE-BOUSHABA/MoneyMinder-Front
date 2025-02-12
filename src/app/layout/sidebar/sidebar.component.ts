// src/app/layout/sidebar/sidebar.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl:'sidebar.component.html'
})
export class SidebarComponent {
  @Input() isOpen = true;
  isCollapsed = false;
  isTransactionsOpen = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }


}

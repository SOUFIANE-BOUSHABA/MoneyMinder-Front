// src/app/layout/header/header.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'header.component.html'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  isProfileOpen = false;

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }
}

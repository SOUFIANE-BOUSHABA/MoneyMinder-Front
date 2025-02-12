import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../header/header.component";
import {SidebarComponent} from "../sidebar/sidebar.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  template: `
    <div class="min-h-screen bg-zinc-50">
      <app-header (toggleSidebar)="toggleSidebar()"></app-header>
      <app-sidebar [isOpen]="isSidebarOpen"></app-sidebar>

      <main class="transition-all duration-300"
            [class.lg:ml-64]="!isSidebarOpen && !isCollapsed"
            [class.lg:ml-20]="!isSidebarOpen && isCollapsed"
            [class.ml-0]="isSidebarOpen">
        <router-outlet></router-outlet>
      </main>
    </div>
  `
})
export class MainLayoutComponent {
  isSidebarOpen = false;
  isCollapsed = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

// src/app/pages/users/users.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  avatar: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'users.component.html'
})
export class UsersComponent {
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      lastActive: '2 minutes ago',
      avatar: 'https://v0.dev/placeholder.svg'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active',
      lastActive: '1 hour ago',
      avatar: 'https://v0.dev/placeholder.svg'
    },
    // Add more users as needed
  ];
}

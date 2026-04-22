import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule, 
    MatListModule, 
    MatIconModule, 
    MatDividerModule,
    RouterLink,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  navItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '/' },
    { label: 'Zadania', icon: 'task', path: '/' },
    { label: 'Ustawienia', icon: 'settings', path: '/' },
    { label: 'Zarejestruj się', icon: 'person_add', path: '/register' }
  ];
}

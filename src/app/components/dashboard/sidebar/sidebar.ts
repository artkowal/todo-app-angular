import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule, 
    MatListModule, 
    MatIconModule, 
    MatDividerModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  navItems = [
    { label: 'Dashboard', icon: 'dashboard', path: '#' },
    { label: 'Zadania', icon: 'task', path: '#' },
    { label: 'Ustawienia', icon: 'settings', path: '#' }
  ];
}

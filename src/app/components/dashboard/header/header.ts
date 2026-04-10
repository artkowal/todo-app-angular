import { Component, EventEmitter, signal, Output } from '@angular/core';
import { CommonModule } from '@angular/common'

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isDarkMode = signal(false);

  @Output() menuClick = new EventEmitter<void>();

  toggleTheme() {
    this.isDarkMode.update(val => !val);
    
    if (this.isDarkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-widget.html',
  styleUrl: './date-widget.css'
})
export class DateWidgetComponent implements OnDestroy {
  currentTime = signal(new Date());
  
  timer = setInterval(() => this.currentTime.set(new Date()), 1000);

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  get dayName() {
    const day = new Intl.DateTimeFormat('pl-PL', { weekday: 'long' }).format(this.currentTime());
    return day.charAt(0).toUpperCase() + day.slice(1);
  }

  get formattedDate() {
    return new Intl.DateTimeFormat('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(this.currentTime());
  }

  get hoursMins() {
    return new Intl.DateTimeFormat('pl-PL', { hour: '2-digit', minute: '2-digit' }).format(this.currentTime());
  }

  get seconds() {
    return new Intl.DateTimeFormat('pl-PL', { second: '2-digit' }).format(this.currentTime());
  }
}
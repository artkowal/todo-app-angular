import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-stats-card',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.css',
})
export class StatsCard {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: number;
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) color!: string;
  @Input({ required: true }) bgColor!: string;
}

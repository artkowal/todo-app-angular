import { Component, inject } from '@angular/core';

import { StatsCard } from '../stats-card/stats-card';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-stats-grid',
  imports: [StatsCard],
  templateUrl: './stats-grid.html',
  styleUrl: './stats-grid.css',
})
export class StatsGrid {
  todoService = inject(TodoService);
}

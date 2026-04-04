import { Component, inject, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from '../../../services/todo.service';


@Component({
  selector: 'app-timeline',
  imports: [
    CommonModule,
    DatePipe, 
    MatIconModule
  ],
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class Timeline {
  private todoService = inject(TodoService);

  latestTodos = computed(() => {
    const all = [...this.todoService.filteredTodos()];
    return all
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  });
}

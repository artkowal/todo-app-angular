import { Component, inject } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FilterType } from '../../models/todo';

@Component({
  selector: 'app-filter-bar',
  imports: [],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.css',
})
export class FilterBar {
  todoService = inject(TodoService);

  currentFilter = this.todoService.currentFilter;

  setFilter(filter: FilterType) {
    this.todoService.setFilter(filter);
  }
}

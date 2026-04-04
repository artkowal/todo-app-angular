import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { StatsGrid } from '../stats-grid/stats-grid';
import { TodoList } from '../../todo-list/todo-list';
import { TodoListTailwind } from '../../tailwind/todo-list-tailwind/todo-list-tailwind';
import { TodoService } from '../../../services/todo.service';
import { Timeline } from '../timeline/timeline';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, 
    MatSidenavModule, 
    Sidebar, 
    Header, 
    StatsGrid,
    TodoList,
    TodoListTailwind,
    Timeline,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  todoService = inject(TodoService);
}

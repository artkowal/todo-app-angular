import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { TodoService } from '../../services/todo.service';
import { TodoItem } from '../todo-item/todo-item';
import { FilterBar } from '../filter-bar/filter-bar';
import { DateWidgetComponent } from '../date-widget/date-widget';
import { TodoModal } from '../todo-modal/todo-modal';

import { Todo } from '../../models/todo';


@Component({
  selector: 'app-todo-list',
  imports: [
    CommonModule,
    TodoItem,
    FilterBar,
    DateWidgetComponent,
    TodoModal
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-12px)' }),
        animate('220ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })) 
      ]),
      transition(':leave', [
        animate('220ms ease-in', style({ opacity: 0, transform: 'translateX(48px)' }))
      ])
    ])
  ]
})
export class TodoList {
  todoService = inject(TodoService);

  isModalOpen = signal(false);
  todoToEdit = signal<Todo | null>(null);

  openAddModal() {
    this.todoToEdit.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(todo: Todo) {
    this.todoToEdit.set(todo);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  handleSave(data: any) {
    if (this.todoToEdit()) {
      this.todoService.editTodo(data.id, data.title, data.description, data.priority, data.date);
    } else {
      this.todoService.addTodo(data.title, data.description, data.priority, data.date);
    }
    this.closeModal();
  }

}

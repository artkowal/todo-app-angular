import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Todo } from '../../../models/todo';

@Component({
  selector: 'app-todo-item-tailwind',
  imports: [
    CommonModule, 
    DatePipe, 
    MatIconModule
  ],
  templateUrl: './todo-item-tailwind.html',
  styleUrl: './todo-item-tailwind.css',
})
export class TodoItemTailwind {
  @Input({ required: true}) todo!: Todo;

  @Output() toggle = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Todo>();

  onToggle(): void {
    this.toggle.emit(this.todo.id);
  }

  onDelete(): void {
    this.delete.emit(this.todo.id);
  }

  onEdit(): void {
    this.edit.emit(this.todo);
  }
}

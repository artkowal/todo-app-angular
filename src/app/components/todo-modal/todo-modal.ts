import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-modal.html',
  styleUrl: './todo-modal.css',
  providers: [DatePipe]
})
export class TodoModal {
  @Input() isOpen = false;
  @Input() set todoToEdit(todo: Todo | null) {
    if (todo) {
      this.isEditMode = true;
      this.editId = todo.id;
      this.title = todo.title;
      this.description = todo.description || '';
      this.priority = todo.priority || 'Średni';
      
      this.selectedDate = this.datePipe.transform(todo.createdAt, 'yyyy-MM-dd') || '';
    } else {
      this.resetForm();
    }
  }

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<{
    id?: string, 
    title: string, 
    description: string, 
    priority: 'Niski' | 'Średni' | 'Wysoki', 
    date: Date
  }>();

  isEditMode = false;
  editId?: string;

  title: string = '';
  description: string = '';
  priority: 'Niski' | 'Średni' | 'Wysoki' = 'Średni';
  selectedDate: string = '';

  constructor(private datePipe: DatePipe) {
    this.selectedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
  }

  onSubmit() {
    if (this.title.trim() && this.selectedDate) {
      this.save.emit({
        id: this.editId,
        title: this.title.trim(),
        description: this.description.trim(),
        priority: this.priority,
        date: new Date(this.selectedDate)
      });
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
  }

  resetForm() {
    this.isEditMode = false;
    this.editId = undefined;
    this.title = '';
    this.description = '';
    this.priority = 'Średni';
    this.selectedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
  }
}
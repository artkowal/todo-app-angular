import { Injectable, signal, computed, effect } from '@angular/core';
import {Todo, FilterType} from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosSignal = signal<Todo[]>(this.loadFromLocalStorage());
  private filterSignal = signal<FilterType>('all');

  constructor() {
    effect(() => {
      localStorage.setItem('todo-app-data', JSON.stringify(this.todosSignal()));
    })
  }

  private loadFromLocalStorage(): Todo[] {
    const saved = localStorage.getItem('todo-app-data');
    if(saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }));
      } catch (e) {
        return []
      }
    }
    return [];
  }

  readonly currentFilter = this.filterSignal.asReadonly();

  readonly filteredTodos = computed(() => {
    const todos = this.todosSignal();
    const filter = this.filterSignal();

    if(filter === 'active') return todos.filter(t => !t.completed);
    if(filter === 'completed') return todos.filter(t => t.completed);

    return todos;
  });

  readonly activeCount = computed(() => {
    return this.todosSignal().filter(t => !t.completed).length;
  });

  addTodo(title: string, description?: string, priority?: 'Niski' | 'Średni' | 'Wysoki', date?: Date) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      completed: false,
      createdAt: date ? new Date(date) : new Date()
    };

    this.todosSignal.update(todos => [newTodo, ...todos]);
  }

  toggleTodo(id: string) {
    this.todosSignal.update(todos => 
      todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id:string) {
    this.todosSignal.update(todos => todos.filter(todo => todo.id !== id));
  }

  editTodo(id: string, newTitle: string, newDescription?: string, newPriority?: 'Niski' | 'Średni' | 'Wysoki', newDate?: Date) {
    this.todosSignal.update(todos => 
      todos.map(todo => 
        todo.id === id 
          ? { 
              ...todo, 
              title: newTitle, 
              description: newDescription, 
              priority: newPriority,
              createdAt: newDate ? new Date(newDate) : todo.createdAt
            } 
          : todo
      )
    );
  }

  setFilter(filter: FilterType) {
    this.filterSignal.set(filter);
  }

}

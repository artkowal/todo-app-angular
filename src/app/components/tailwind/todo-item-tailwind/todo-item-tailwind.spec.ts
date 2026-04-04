import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemTailwind } from './todo-item-tailwind';

describe('TodoItemTailwind', () => {
  let component: TodoItemTailwind;
  let fixture: ComponentFixture<TodoItemTailwind>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoItemTailwind],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemTailwind);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

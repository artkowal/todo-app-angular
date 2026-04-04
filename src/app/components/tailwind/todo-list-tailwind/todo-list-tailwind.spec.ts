import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListTailwind } from './todo-list-tailwind';

describe('TodoListTailwind', () => {
  let component: TodoListTailwind;
  let fixture: ComponentFixture<TodoListTailwind>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListTailwind],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListTailwind);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

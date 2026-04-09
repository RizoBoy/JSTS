import assert from 'assert';
import { tasksReducer } from '../src/store/reducers/tasksReducer.js';

describe('tasksReducer', () => {
  test('should return initial state when no action is passed', () => {
    const state = tasksReducer();
    assert.deepStrictEqual(state, { tasks: [] });
  });

  test('should add a task', () => {
    const initialState = { tasks: [] };
    const action = {
      type: 'ADD_TASK',
      payload: { id: 1, title: 'Test Task', completed: false }
    };
    
    const newState = tasksReducer(initialState, action);
    
    assert.strictEqual(newState.tasks.length, 1);
    assert.deepStrictEqual(newState.tasks[0], { id: 1, title: 'Test Task', completed: false });
  });

  test('should remove a task by id', () => {
    const initialState = {
      tasks: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: false }
      ]
    };
    const action = {
      type: 'REMOVE_TASK',
      payload: 1
    };
    
    const newState = tasksReducer(initialState, action);
    
    assert.strictEqual(newState.tasks.length, 1);
    assert.strictEqual(newState.tasks[0].id, 2);
  });

  test('should update a task', () => {
    const initialState = {
      tasks: [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: false }
      ]
    };
    const action = {
      type: 'UPDATE_TASK',
      payload: {
        id: 1,
        updates: { title: 'Updated Task', completed: true }
      }
    };
    
    const newState = tasksReducer(initialState, action);
    
    assert.strictEqual(newState.tasks.length, 2);
    assert.strictEqual(newState.tasks[0].title, 'Updated Task');
    assert.strictEqual(newState.tasks[0].completed, true);
    assert.strictEqual(newState.tasks[1].title, 'Task 2');
  });

  test('should maintain immutability - not modify original state', () => {
    const initialState = {
      tasks: [{ id: 1, title: 'Task 1', completed: false }]
    };
    const action = {
      type: 'ADD_TASK',
      payload: { id: 2, title: 'Task 2', completed: false }
    };
    
    const newState = tasksReducer(initialState, action);
    
    assert.strictEqual(initialState.tasks.length, 1);
    assert.strictEqual(newState.tasks.length, 2);
  });

  test('should return same state for unknown action', () => {
    const initialState = { tasks: [{ id: 1, title: 'Task', completed: false }] };
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: {}
    };
    
    const newState = tasksReducer(initialState, action);
    
    assert.deepStrictEqual(newState, initialState);
  });
});

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

function test(name, fn) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
  } catch (error) {
    console.log(`  ✗ ${name}`);
    console.error(`    ${error.message}`);
  }
}

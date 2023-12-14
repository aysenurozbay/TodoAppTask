import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TodoType} from '../Types';

export interface TodoReducerState {
  todos: TodoType[];
  selectedTodo?: TodoType | null;
  filteredTodo?: TodoType[] | null;
}

const initialState: TodoReducerState = {
  todos: [],
  selectedTodo: null,
  filteredTodo: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{todo: TodoType}>) => {
      const newTodo = action.payload.todo;
      state.todos.push(newTodo);
    },
    setSelectedProduct: (state, action: PayloadAction<{id: string}>) => {
      const todoId = action.payload.id;
      state.selectedTodo = state.todos.find(p => p.id === todoId);
    },
    filterByCategory: (state, action: PayloadAction<{category: string}>) => {
      const category = action.payload.category;
      state.todos = state.todos.filter(p => p.category === category);
    },
    filterByStatus: (state, action: PayloadAction<{status: string}>) => {
      const status = action.payload.status;
      state.todos = state.todos.filter(p => p.status === status);
    },
    changeTodoStatus: (
      state,
      action: PayloadAction<{id: string; newStatus: TodoType['status']}>,
    ) => {
      const todoId = action.payload.id;
      const status = action.payload.newStatus;
      const todo = state.todos.find(item => item.id === todoId);
      if (todo) {
        todo.status = status;
      }
    },
  },
});

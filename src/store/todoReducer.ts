import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TodoType} from '../Types';
import {getData, storeData} from '../helpers/AsyncStorageHelper';

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
export const fetchInitialData = createAsyncThunk(
  'waterTracker/fetchInitialData',
  async (_, {rejectWithValue}) => {
    try {
      const retrievedData = await getData();
      console.log('Gelen Veri', retrievedData);

      return retrievedData;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const setAsyncStorageData = createAsyncThunk(
  'waterAmount/setAsyncStorageData',
  async (data: TodoType, {rejectWithValue}) => {
    try {
      await storeData(data);
      console.log('setledi', data);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

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
      state.filteredTodo = state.todos.filter(p => p.category === category);
    },
    filterByStatus: (state, action: PayloadAction<{status: string}>) => {
      const status = action.payload.status;
      state.filteredTodo = state.todos.filter(p => p.status === status);
      console.log('filterByStatus--->', state.filteredTodo);
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
  extraReducers: builder => {
    builder.addCase(fetchInitialData.fulfilled, (state, action) => {
      if (action.payload) {
        const convertToObject = action.payload;
        state.todos = convertToObject;
        console.log('state.todos', state.todos);
      }
    });
    builder.addCase(setAsyncStorageData.fulfilled, (state, action) => {
      console.log('action.payload', action.payload);

      if (action.payload) {
        state.todos.push(action.payload);
      }
    });
  },
});

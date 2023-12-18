import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {TodoType} from '../Types';
import {
  getData,
  removeData,
  storeData,
  updateData,
} from '../helpers/AsyncStorageHelper';

export interface TodoReducerState {
  todos: TodoType[];
  selectedTodo?: TodoType | null;
}

const initialState: TodoReducerState = {
  todos: [],
  selectedTodo: null,
};
export const fetchInitialData = createAsyncThunk(
  'waterTracker/fetchInitialData',
  async (_, {rejectWithValue}) => {
    try {
      const retrievedData = await getData();
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
export const updateAsyncStorageData = createAsyncThunk(
  'waterAmount/updateAsyncStorageData',
  async (data: TodoType, {rejectWithValue}) => {
    try {
      await updateData(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const deleteAsyncStorageData = createAsyncThunk(
  'waterAmount/deleteAsyncStorageData',
  async (data: string, {rejectWithValue}) => {
    try {
      await removeData(data);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchInitialData.fulfilled, (state, action) => {
      if (action.payload) {
        const convertToObject = action.payload;
        state.todos = convertToObject;
      }
    });
    builder.addCase(setAsyncStorageData.fulfilled, (state, action) => {
      if (action.payload) {
        state.todos.push(action.payload);
      }
    });
    builder.addCase(updateAsyncStorageData.fulfilled, (state, action) => {
      state.todos = [action.payload];
    });
    // builder.addCase(deleteAsyncStorageData.fulfilled, () => {});
  },
});

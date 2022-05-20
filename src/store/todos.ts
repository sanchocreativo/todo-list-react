import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  message: string;
  completed: boolean;
}

const todos = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push({ id: uuidv4(), message: action.payload, completed: false });
      return state;
    },
    editTodo: (state, action: PayloadAction<Todo>) => {
      const newMesage = state.find((todo) =>
        todo.id === action.payload.id);
      if (newMesage) {
        newMesage.message = action.payload.message;
      }
      return state;
    },
    deleteTodo: (state, action: PayloadAction<string>) =>
      state.filter(todo => todo.id !== action.payload),
    completeTodo: (state, action: PayloadAction<string>) => {
      const completedTodo = state.find(todo => todo.id === action.payload);
      if (completedTodo) {
        completedTodo.completed = true;
      }
      return state;
    },
    sort: state => state.sort((a, b) => a.message.localeCompare(b.message))
  }
});

export default todos;

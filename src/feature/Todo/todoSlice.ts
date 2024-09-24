import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types";

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "@todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: state.todos.length + 1,
        title: action.payload,
        completed: false,
      };
      return { ...state, todos: [newTodo, ...state.todos] };
    },
    deleteTodo: (state, action: PayloadAction<Todo["id"]>) => {
      state.todos = state.todos.filter(
        (todo: Todo) => todo.id !== action.payload
      );
    },
    updateTodo: (state, action: PayloadAction<Todo["id"]>) => {
      const todo = state.todos.find((todo: Todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;

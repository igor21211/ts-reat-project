import { createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../types";
import {
  createTodo,
  removeTodo,
  fetchTodos,
  updateSuccessTodo,
} from "./todoAsyncActions";

export interface TodoStateAsync {
  status: "idle" | "loading" | "finished" | "error";
  todos: Todo[];
}

const initialState: TodoStateAsync = {
  status: "idle",
  todos: [],
};

const todoSlice = createSlice({
  name: "@todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "finished";
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(createTodo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.status = "finished";
      state.todos.push(action.payload);
    });
    builder.addCase(createTodo.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(removeTodo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(removeTodo.fulfilled, (state, action) => {
      state.status = "finished";
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(removeTodo.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(updateSuccessTodo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateSuccessTodo.fulfilled, (state, action) => {
      state.status = "finished";
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    });
    builder.addCase(updateSuccessTodo.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default todoSlice.reducer;

import { RootState } from "@/store";
import { Todo } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TodoStateAsync } from "./asyncTodoSlice";

export const fetchTodos = createAsyncThunk<
  Todo[],
  undefined,
  { state: { todosAsync: TodoStateAsync } }
>(
  "todos/fetchTodos",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    return await response.json(); // as Todo[];
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().todosAsync;
      if (status === "loading") {
        return false;
      }
    },
  }
);

export const createTodo = createAsyncThunk<Todo, string>(
  "todos/createTodo",
  async (title) => {
    const newTodo: Required<Omit<Todo, "id">> = {
      title,
      completed: false,
      userId: 1,
    };
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    return await response.json(); // as Todo;
  }
);

export const removeTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: Todo["id"]) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    });
    return id;
  }
);

export const updateSuccessTodo = createAsyncThunk(
  "todos/updateSuccessTodo",
  async (id: Todo["id"]) => {
    const getTodo = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    const todo = (await getTodo.json()) as Todo;
    const updateTodo = { ...todo, completed: !todo.completed };

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateTodo),
      }
    );
    return (await response.json()) as Todo;
  }
);

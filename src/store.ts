import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./feature/Todo/todoSlice";
import todoAsyncReducer from "./feature/Todo/asyncTodoSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
  todosAsync: todoAsyncReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

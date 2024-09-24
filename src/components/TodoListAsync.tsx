import { Todo } from "@/types";
import { useAppDispatch, useAppSelector } from "../redux-hooks";
import TodoItem from "./TodoItem";
import { selectAllTodosAsync } from "../feature/Todo/asyncTodoSelector";
import { useCallback, useEffect } from "react";
import {
  fetchTodos,
  removeTodo,
  updateSuccessTodo,
} from "../feature/Todo/todoAsyncActions";

const TodoListAsync = () => {
  const { todos, status } = useAppSelector(selectAllTodosAsync);
  const dispatch = useAppDispatch();
  const deleteTodos = useCallback(
    (id: Todo["id"]) => {
      dispatch(removeTodo(id));
    },
    [dispatch]
  );

  const updateTodos = useCallback(
    (id: Todo["id"]) => {
      dispatch(updateSuccessTodo(id));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <ul>
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Error</p>}
      {status === "finished" &&
        todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            deleteTodo={deleteTodos}
            updateTodo={updateTodos}
          />
        ))}
    </ul>
  );
};

export default TodoListAsync;

import { Todo } from "@/types";
import { useAppDispatch, useAppSelector } from "../redux-hooks";
import TodoItem from "./TodoItem";
import { deleteTodo, updateTodo } from "../feature/Todo/todoSlice";
import { selectAllTodos } from "../feature/Todo/TodoSelectors";

const TodoList = () => {
  const list = useAppSelector(selectAllTodos);
  const dispatch = useAppDispatch();
  const deleteTodos = (id: Todo["id"]) => {
    dispatch(deleteTodo(id));
  };
  const updateTodos = (id: Todo["id"]) => {
    dispatch(updateTodo(id));
  };
  return (
    <ul>
      {list.todos.map((todo: Todo) => (
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

export default TodoList;

import React from "react";
import { Todo } from "../types";
// interface TodoItemProps {
//   id: number;
//   title: string;
//   completed: boolean;
//   style?: React.CSSProperties;
// }

interface TodoItemProps extends Todo {
  style?: React.CSSProperties;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number) => void;
}

const TodoItem = ({
  id,
  title,
  completed,
  style = {},
  deleteTodo,
  updateTodo,
}: TodoItemProps) => {
  return (
    <li style={{ color: `${completed ? "green" : "red"}`, ...style }} key={id}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => updateTodo(id)}
      />
      <span>{title}</span>
      <button onClick={() => deleteTodo(id)}>Delete</button>
    </li>
  );
};

export default TodoItem;

import { useEffect, useState } from "react";
import "./App.css";
import NewTodoForm from "./components/NewTodoForm";
import { Todo } from "./types";
import TodoList from "./components/TodoList";
import NewTodoFormAsync from "./components/NewTodoFormAsync";
import TodoListAsync from "./components/TodoListAsync";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data: Todo[]) => {
        setTodos(data);
      });
  }, []);

  return (
    <div>
      <NewTodoForm />
      <TodoList />
      <hr />
      <NewTodoFormAsync />
      <TodoListAsync />
    </div>
  );
}

export default App;

import { createTodo } from "../feature/Todo/todoAsyncActions";
import { useAppDispatch } from "../redux-hooks";
import { useRef } from "react";

const NewTodoFormAsync = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onClick = () => {
    if (inputRef.current) {
      dispatch(createTodo(inputRef.current.value));
      inputRef.current.value = "";
    }
  };
  return (
    <>
      <input type="text" placeholder="Enter new todo" ref={inputRef} />
      <button onClick={onClick}>Add todo</button>
    </>
  );
};

export default NewTodoFormAsync;

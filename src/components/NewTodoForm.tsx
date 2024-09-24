import { addTodo } from "../feature/Todo/todoSlice";
import { useAppDispatch } from "../redux-hooks";
import { useRef } from "react";

const NewTodoForm = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onClick = () => {
    if (inputRef.current) {
      dispatch(addTodo(inputRef.current.value));
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

export default NewTodoForm;

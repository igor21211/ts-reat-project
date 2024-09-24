import { RootState } from "../../store";

export const selectAllTodosAsync = (state: RootState) => state.todosAsync;

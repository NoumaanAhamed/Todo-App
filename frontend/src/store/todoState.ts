import { atom } from "recoil";
import { Todo } from "../models/todos";

export const todosState = atom<Todo[]>({
  key: "todosState",
  default: [],
});

export const showAddTodoDialogState = atom<boolean>({
  key: "showAddTodoDialogState",
  default: false,
});

export const todoToEditState = atom<Todo | null>({
  key: "todoToEditState",
  default: null,
});

export const todosLoadingState = atom<boolean>({
  key: "todosLoadingState",
  default: true,
});

export const showTodosLoadingErrorState = atom<boolean>({
  key: "showTodosLoadingErrorState",
  default: false,
});

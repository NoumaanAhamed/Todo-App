import { Todo } from "../models/todos";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    //* for 4xx and 5xx errors
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

//* all async functions return promises

export async function fetchTodos(): Promise<Todo[]> {
  const response = await fetchData("http://localhost:5000/api/todos", {
    method: "GET",
  });
  return response.json();
}

export interface TodoInput {
  title: string;
  text?: string;
}

export async function createTodo(todo: TodoInput): Promise<Todo> {
  const response = await fetchData("http://localhost:5000/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  return response.json();
}

export async function updateTodo(
  todoId: string,
  todo: TodoInput
): Promise<Todo> {
  const response = await fetchData(
    "http://localhost:5000/api/todos/" + todoId,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }
  );
  return response.json();
}

export async function deleteTodo(todoId: string) {
  await fetchData("http://localhost:5000/api/todos/" + todoId, {
    method: "DELETE",
  });
}

export async function toggleTodoStatus(todoId: string) {
  await fetchData(
    "http://localhost:5000/api/todos/" + todoId + "/isCompleted",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

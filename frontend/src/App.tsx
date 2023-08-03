import { useEffect, useState } from "react";
import "./App.css";
import { Todo as TodoModel } from "./models/todos";
import Todo from "./components/Todo";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "./styles/TodoPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as TodosApi from "./network/todos_api";
import AddEditTodoDialog from "./components/AddEditTodoDialog";
import { FaPlus } from "react-icons/fa";

function App() {
  // const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [showAddTodoDialog, setShowAddTodoDialog] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<TodoModel | null>(null);
  const [todosLoading, setTodosLoading] = useState(true);
  const [showTodosLoadingError, setShowTodosLoadingError] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setShowTodosLoadingError(false);
        setTodosLoading(true);
        const todos = await TodosApi.fetchTodos();
        setTodos(todos);
        // throw Error("Error...");
      } catch (error) {
        console.log(error);
        setShowTodosLoadingError(true);
      } finally {
        setTodosLoading(false);
      }
    }
    fetchTodos();
  }, []);

  async function deleteTodo(todo: TodoModel) {
    try {
      await TodosApi.deleteTodo(todo._id);
      setTodos(todos.filter((existingTodo) => existingTodo._id !== todo._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  async function handleMarkAsDoneCLicked(todo: TodoModel) {
    try {
      await TodosApi.toggleTodoStatus(todo._id);
      setTodos(
        todos.map((existingTodo) =>
          existingTodo._id === todo._id
            ? { ...existingTodo, isCompleted: !existingTodo.isCompleted }
            : existingTodo
        )
      );
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const todosGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.todosGrid}`}>
      {todos.map((todo) => (
        <Col key={todo._id}>
          <Todo
            onTodoClicked={setTodoToEdit}
            onDeleteTodoClicked={deleteTodo}
            todo={todo}
            className={styles.todo}
            onMarkAsDoneClicked={handleMarkAsDoneCLicked}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container className={styles.todosPage}>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => {
          setShowAddTodoDialog(true);
        }}
      >
        <FaPlus />
        Add new todo
      </Button>
      {todosLoading && <Spinner animation="border" variant="primary" />}
      {showTodosLoadingError && (
        <p>Something went wrong. Please refresh the page.</p>
      )}
      {!todosLoading && !showTodosLoadingError && (
        <>
          {todos.length > 0 ? todosGrid : <p>You don't have any todos yet.</p>}
        </>
      )}
      {/* if showTodo is given inside Dialog then state of form is maintained as state is inside dialog via props */}
      {showAddTodoDialog && (
        <AddEditTodoDialog
          onTodoSaved={(newTodo) => {
            setTodos([...todos, newTodo]);
            setShowAddTodoDialog(false);
          }}
          onDismiss={() => {
            setShowAddTodoDialog(false);
          }}
        />
      )}
      {todoToEdit && (
        <AddEditTodoDialog
          todoToEdit={todoToEdit}
          onDismiss={() => {
            setTodoToEdit(null);
          }}
          onTodoSaved={(updatedTodo) => {
            setTodos(
              todos.map((existingTodo) => {
                return existingTodo._id === updatedTodo._id
                  ? updatedTodo
                  : existingTodo;
              })
            );
            setTodoToEdit(null);
          }}
        />
      )}
    </Container>
  );
}
export default App;

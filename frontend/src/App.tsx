import { useEffect, useState } from "react";
import "./App.css";
import { Todo as TodoModel } from "./models/todos";
import Todo from "./components/Todo";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/TodoPage.module.css";

function App() {
  // const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<TodoModel[]>([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("http://localhost:5000/api/todos", {
          method: "GET",
        });
        const todos = await response.json();
        setTodos(todos);
        // throw Error("Error...");
      } catch (error) {
        console.log(error);
      }
    }
    fetchTodos();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {todos.map((todo) => (
          <Col key={todo._id}>
            <Todo todo={todo} className={styles.todo} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
export default App;

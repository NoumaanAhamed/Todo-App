import styles from "../styles/Todo.module.css";
import { Card } from "react-bootstrap";
import { Todo as TodoModel } from "../models/todos";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";
// import React from "react";

interface TodoProps {
  todo: TodoModel;
  onTodoClicked: (todo: TodoModel) => void;
  onDeleteTodoClicked: (todo: TodoModel) => void;
  className?: string;
}

const Todo = ({
  todo,
  className,
  onTodoClicked,
  onDeleteTodoClicked,
}: TodoProps) => {
  const { title, text, createdAt, updatedAt, isCompleted } = todo;

  //*Cheap operation
  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      onClick={() => {
        onTodoClicked(todo);
      }}
      className={`${styles.todoCard} ${className}`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <MdDelete
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              onDeleteTodoClicked(todo);
              e.stopPropagation();
            }}
            className="text-muted ms-auto"
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Todo;

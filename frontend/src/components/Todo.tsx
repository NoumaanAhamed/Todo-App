import styles from "../styles/Todo.module.css";
import { Card } from "react-bootstrap";
import { Todo as TodoModel } from "../models/todos";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";
import styleUtils from "../styles/utils.module.css";
import { useSetRecoilState } from "recoil";
import { todoToEditState } from "../store/todoState";
// import React from "react";

interface TodoProps {
  todo: TodoModel;
  onDeleteTodoClicked: (todo: TodoModel) => void;
  onMarkAsDoneClicked: (todo: TodoModel) => void;
  className?: string;
}

const Todo = ({
  todo,
  className,
  onDeleteTodoClicked,
  onMarkAsDoneClicked,
}: TodoProps) => {
  const onTodoClicked = useSetRecoilState(todoToEditState);

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
      className={`${styles.todoCard} ${className} ${
        isCompleted ? styles.todoDone : ""
      }`}
    >
      <Card.Body className={styles.cardBody}>
        <Card.Title
          className={`${styleUtils.flexCenter} ${
            isCompleted ? styles.todoDoneTitle : ""
          }`}
        >
          {title}
          <MdDelete
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              onDeleteTodoClicked(todo);
              e.stopPropagation();
            }}
            className="text-muted ms-auto"
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className={`text-muted ${styleUtils.flexBetween}`}>
        {createdUpdatedText}
        {isCompleted ? (
          <button
            className={`${styles.markDoneButton} ${styles.markUndoneButton}`}
            onClick={(e) => {
              onMarkAsDoneClicked(todo);
              e.stopPropagation();
            }}
          >
            Undone
          </button>
        ) : (
          <button
            className={styles.markDoneButton}
            onClick={(e) => {
              onMarkAsDoneClicked(todo);
              e.stopPropagation();
            }}
          >
            Done
          </button>
        )}
      </Card.Footer>
    </Card>
  );
};

export default Todo;

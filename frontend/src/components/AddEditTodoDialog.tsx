import { Button, Form, Modal } from "react-bootstrap";
import { Todo } from "../models/todos";
import { useForm } from "react-hook-form";
import { TodoInput } from "../network/todos_api";
import * as TodosApi from "../network/todos_api";

interface AddEditTodoDialogProps {
  todoToEdit?: Todo;
  onDismiss: () => void;
  onTodoSaved: (todo: Todo) => void;
}

const AddEditTodoDialog = ({
  todoToEdit,
  onDismiss,
  onTodoSaved,
}: AddEditTodoDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TodoInput>({
    defaultValues: {
      title: todoToEdit?.title || "",
      text: todoToEdit?.text || "",
    },
  });

  async function onSubmit(input: TodoInput) {
    try {
      let todoResponse: Todo;

      if (todoToEdit) {
        todoResponse = await TodosApi.updateTodo(todoToEdit._id, input);
      } else {
        todoResponse = await TodosApi.createTodo(input);
      }
      onTodoSaved(todoResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{todoToEdit ? "Edit Todo" : "Add Todo"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditTodoForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Leave it empty to let AI generate text for you"
              {...register("text")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        {/* connect to form  */}
        <Button type="submit" form="addEditTodoForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditTodoDialog;

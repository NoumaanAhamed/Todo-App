import express from "express";
import * as TodosController from "../controllers/todos";

const router = express.Router();

router.get("/", TodosController.getTodos);
router.get("/:id", TodosController.getTodo);
router.post("/", TodosController.createTodos);
router.patch("/:id", TodosController.updateTodo);
router.delete("/:id", TodosController.deleteTodo);

export default router;

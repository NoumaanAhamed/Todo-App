import express from "express";
import * as TodosController from "../controllers/todos"

const router = express.Router();

router.get('/',TodosController.getTodos);

export default router;
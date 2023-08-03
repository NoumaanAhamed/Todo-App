import { RequestHandler } from "express"; //! infers the req,res,next
import TodoModel from "../models/todo";
import createHttpError from "http-errors";
import mongoose from "mongoose";

//  * to let TS infer types of req,res,next
export const getTodos: RequestHandler = async (req, res, next) => {
  try {
    // throw createHttpError(401);
    const todos = await TodoModel.find().exec();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

export const getTodo: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid todo id");
    }

    const todo = await TodoModel.findById(id).exec();

    if (!todo) {
      throw createHttpError(404, "todo not found");
    }
    // throw Error(" Personal Error....");
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

interface CreateTodoBody {
  title?: string; //!as we need the data
  text?: string;
  isCompleted?: boolean;
}

export const createTodos: RequestHandler<
  unknown,
  unknown,
  CreateTodoBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;

  try {
    // throw Error(" Personal Error....");

    if (!title) {
      throw createHttpError(400, "Title missing in the todo");
    }

    const newTodo = await TodoModel.create({ title, text });

    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

interface UpdateTodoParams {
  id: string;
} //! as we are giving the body

interface UpdateTodoBody {
  title?: string;
  text?: string;
  isCompleted?: boolean;
}

export const updateTodo: RequestHandler<
  UpdateTodoParams,
  unknown,
  UpdateTodoBody,
  unknown
> = async (req, res, next) => {
  const { id } = req.params;
  const { title, text } = req.body;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid todo id");
    }

    if (!title) {
      throw createHttpError(400, "Title missing in the todo");
    }

    const todo = await TodoModel.findByIdAndUpdate(
      id,
      { title, text },
      { new: true }
    );

    if (!todo) {
      throw createHttpError(404, "todo not found");
    }

    res.status(200).send(todo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo: RequestHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid todo id");
    }

    const todo = await TodoModel.findByIdAndDelete(id);
    if (!todo) {
      throw createHttpError(404, "todo not found");
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const updateIsCompletedStatus: RequestHandler = async (
  req,
  res,
  next
) => {
  const { id } = req.params;

  try {
    if (!mongoose.isValidObjectId(id)) {
      throw createHttpError(400, "Invalid todo id");
    }

    const todo = await TodoModel.findById(id);
    if (!todo) {
      throw createHttpError(404, "todo not found");
    }

    todo.isCompleted = !todo.isCompleted;

    await todo.save();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

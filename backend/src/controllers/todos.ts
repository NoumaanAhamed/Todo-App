import { RequestHandler } from "express"; //! infers the req,res,next
import TodoModel from "../models/todo";

export const getTodos: RequestHandler  = async (req,res,next) => {
    try{

        // throw Error(" Personal Error....");
        const todos = await TodoModel.find().exec();
        res.status(200).json(todos);
    } catch(error) {
        next(error);
    }
  }
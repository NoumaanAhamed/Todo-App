import "dotenv/config"; //! loads env variable
import express, { NextFunction, Request, Response } from "express";
import todosRoutes from "./routes/todos";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import cors from "cors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/todos", todosRoutes);

//! for all other routes
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

//* TS is not smart enough to the guess the below types but others.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An Unknown Error Occurred";
  let statusCode = 500;
  // if(error instanceof Error) errorMessage = error.message;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;

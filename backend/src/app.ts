import "dotenv/config"; //! loads env variable
import express, { NextFunction, Request, Response } from 'express';
import todosRoutes from "./routes/todos";

const app = express();

app.use('/api/todos',todosRoutes);

  app.use((req,res,next) => {
    next(Error("Endpoint not found"))
  }
  );

  //* TS is not smart enough to the guess the below types but others.

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
        let errorMessage = "Unknown Error";
        if(error instanceof Error) errorMessage = error.message;
        res.status(500).json({error: errorMessage});
}
);

export default app;
import express, { NextFunction , Request, Response} from "express";
import errorHandler from "./middlewares/errorHandler.middleware";

//@types/pkg_name

//* importing routes
import authRoutes from "./routes/auth.routes";

//* express app
const app = express();


//!using middlewares
app.use(express.json());

//* health
app.get('/' , (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
    data: null,
  });
});

//!using routes
app.use('/api/v1/auth', authRoutes);
//app.use('/api/v2/user', authRoutes);

//* path not found
app.use((req: Request,  _: Response, next: NextFunction) => {
  const error: any = new Error(`can not ${req.method} on ${req.path}`);
  error.statusCode = 404;
  error.status = "fail";
  error.success = false;
  next(error);
});

//* error handler
app.use(errorHandler);



export default app;
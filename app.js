
import express from 'express'
import morgan from 'morgan'
import userRouter from './Routers/UserRouter.js';

const app = express()

app.use(morgan('dev'));
app.use("/",userRouter);


export default app;
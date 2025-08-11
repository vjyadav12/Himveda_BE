
import express from 'express'
import morgan from 'morgan'
import userRouter from './Routers/UserRouter.js';
import DbConnection from './DbConnection/DBconnetction.js';
import cors from 'cors'
import cookieParser from "cookie-parser";
import productRouter from './Routers/productsROuter.js';

const app = express()

DbConnection()

// app.use(cors({
//   origin: "https://himveda-be-38v4.vercel.app", // frontend domain
//   credentials: true
// }));

 app.use(cors());


app.use(cookieParser());
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.use("/",userRouter);
app.use("/Products",productRouter);



export default app;
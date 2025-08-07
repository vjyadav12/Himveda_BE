
import express from 'express'
import morgan from 'morgan'
import userRouter from './Routers/UserRouter.js';
import DbConnection from './DbConnection/DBconnetction.js';
import cors from 'cors'

const app = express()

DbConnection()

app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'));
app.use("/",userRouter);


export default app;


import express from 'express'
import { Home, loginUser, Register } from '../Controller/UserController.js';

const userRouter = express.Router();

userRouter.get("/",Home)
userRouter.post("/register",Register)
userRouter.post("/login",loginUser)







export default userRouter;
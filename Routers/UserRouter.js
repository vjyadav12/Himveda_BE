

import express from 'express'
import { Home, Register } from '../Controller/UserController.js';

const userRouter = express.Router();

userRouter.get("/",Home)
userRouter.post("/register",Register)






export default userRouter;
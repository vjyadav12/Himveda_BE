

import express from 'express'
import { Home } from '../Controller/UserController.js';

const userRouter = express.Router();

userRouter.get("/",Home)





export default userRouter;
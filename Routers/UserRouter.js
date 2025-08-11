

import express from 'express'
import { Home, loginUser, LogOut, Profile, Register } from '../Controller/UserController.js';
import UserAuthentication from '../Middleware/UserAuthentication.js';

const userRouter = express.Router();

userRouter.get("/",Home)
userRouter.post("/register",Register)
userRouter.post("/login",loginUser)
userRouter.get("/profile",UserAuthentication,Profile)
userRouter.post("/logout",UserAuthentication,LogOut)








export default userRouter;
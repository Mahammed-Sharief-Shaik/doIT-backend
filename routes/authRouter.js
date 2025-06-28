import express from "express";
import registerUser from '../controllers/registerUser.js'
import loginUser from "../controllers/loginUser.js";

const authRouter = express.Router();

authRouter.post(
    '/register',
    registerUser
);

authRouter.post(
    '/login',
    loginUser
);




export default authRouter;
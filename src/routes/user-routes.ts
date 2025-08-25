import express from "express";

//import middleware files
import ValidateRequestHandler from "../middleware/validate-request-handler";

//import request files
import UserLoginRequest from "../requests/user-login-request";
import UserRegisterRequest from "../requests/user-register-request";

//import controllers
import { registerUser, userLogin } from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.post("/login", UserLoginRequest, ValidateRequestHandler, userLogin);
userRouter.post("/register", UserRegisterRequest, ValidateRequestHandler, registerUser);

export default userRouter;
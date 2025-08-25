import { body } from "express-validator";

const UserLoginRequest: any = [
    body("email").exists().trim().isString().isEmail().withMessage("Invalid email address!"),
    body("password").exists().trim().isString().notEmpty().withMessage("You must enter a password!"),
];

export default UserLoginRequest;
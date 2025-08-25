import { body } from "express-validator";
import config from "config";

import { emailAlreadyIsNotExists } from "../services/auth-service";
import { isPasswordValid } from "../helpers/validators/password-validator-helper";

const minPasswordLength = config.get<number>("PASSWORD_MIN_LENGTH");

//check mandatory fields and valid email, name ,password 
const UserRegisterRequest : any =  [
   body("name").exists().trim().notEmpty().isString().withMessage('Please enter your name!'),
   body("email").exists().trim().notEmpty().isEmail().withMessage('Please enter a valid email address!').custom((value: string, {req}) => {
       return emailAlreadyIsNotExists(req.body.email);
   }),
   body("password").exists().trim().notEmpty().isString().isLength({ min: minPasswordLength }).withMessage(`Password must contain minimum ${minPasswordLength} characters!`).custom((value: string, {req}) => {
        return isPasswordValid(req.body.password);
   })
];

export default UserRegisterRequest;
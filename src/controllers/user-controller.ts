import { Request, Response, NextFunction } from "express";

import _ from "lodash";

import { successResponseHandler } from "../middleware/success-response-handler";

//import services
import { createUser, getToken, login } from "../services/auth-service";

export const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = await login(req.body);

        return await successResponseHandler(res, 200, "Login is successfully!", "token", token);
    } catch (err) {
        return next(err);
    }
};

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const body: any = _.pick(req.body, ["password", "email", "name"]);

        req.body = body;

        const user = await createUser(req);

        const token = await getToken(user);

        return await successResponseHandler(res, 201, "User has been registered successfully!", "token", token);
    } catch (err) {
        return next(err);
    }
};
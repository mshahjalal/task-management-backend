import { Request, Response, NextFunction } from "express";

//import auth service for token verification
import { verifyToken } from "../services/auth-service";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        let customError: any = new Error("Authorization token not found!");
        customError.statusCode = 400;

        return next(customError);
    }

    try {
        const user = await verifyToken(authorization);

        //@ts-ignore
        req.user = user;

        return next();
    } catch (err) {
        return next(err);
    }
};
import { Request, Response, NextFunction } from "express";

import { verifyPermission } from "../services/role-service";

export const authorization = function (requiredPermissions: String[], optionalPermissions?: String[]){
    return async (req: Request, res: Response, next: NextFunction) => {
        //@ts-ignore
        let user: any = req.user;

        if (!user) {
            let customError: any = new Error("Invalid user!");
            customError.statusCode = 400;

            return next(customError);
        }

        try {
            const validPermissions = await verifyPermission(user, requiredPermissions, optionalPermissions);

            //@ts-ignore
            req.user.permissions = validPermissions;
            
            return next();
        } catch (err: any) {
            return next(err);
        }
    };
}; 
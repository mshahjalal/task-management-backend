import { Request, Response, NextFunction } from "express";

import { successResponseHandler } from "../middleware/success-response-handler";
import { addMultipleDefaultRole, updateRoleTypeInfo } from "../services/role-service";

export const updateTypeInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = { assigneeId: req.body.assigneeId, roleType: req.body.roleType };

        const role: any = await updateRoleTypeInfo(req);

        await successResponseHandler(res, 200, "Role updated successfully!");
    } catch (err) {
        next(err);
    }
};

export const addDefaultRoleInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const role = await addMultipleDefaultRole(req);

        await successResponseHandler(res, 201, "Create static role successfully");
    } catch (err) {
        next(err);
    }
};
import { Request, Response, NextFunction } from "express";

import _ from "lodash";

import { successResponseHandler } from "../middleware/success-response-handler";
import { updateRoleTypeInfo } from "../services/role-service";

export const updateTypeInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = { assigneeId: req.body.assigneeId, roleType: req.body.roleType };

        const role: any = await updateRoleTypeInfo(req);

        await successResponseHandler(res, 200, "Role updated successfully!");
    } catch (err) {
        next(err);
    }
};
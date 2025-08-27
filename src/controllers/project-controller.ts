import { Request, Response, NextFunction } from "express";

import _ from "lodash";

import { successResponseHandler } from "../middleware/success-response-handler";

import { addProjectInfo, updateProjectInfo } from "../services/project-service";

export const addInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body: any = _.pick(req.body, ["projectTitle", "description", "status", "userId"]);
        body.userIds = [req.body.userId];

        if (req.body.startDate) body.startDate = req.body.startDate;
        if (req.body.endDate) body.endDate = req.body.endDate;

        req.body = body;

        const role: any = await addProjectInfo(req);

        await successResponseHandler(res, 201, "Project has been created successfully!");
    } catch (err) {
        next(err);
    }
};

export const updateInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body = { assigneeId: req.body.assigneeId, roleType: req.body.roleType };

        const role: any = await updateProjectInfo(req);

        await successResponseHandler(res, 200, "Project updated successfully!");
    } catch (err) {
        next(err);
    }
};

export const getInfo = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const { id } = req.params;

        const project = '';//await getProjectInfo(id);

        return await successResponseHandler(res, 200, "Project info fetch successful!", "details", project);
    } catch (err) {
        return next(err);
    }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        const projects = '';//await getProjectList(req);

        return await successResponseHandler(res, 200, "Project list fetch successful!", null, projects);
    } catch (err) {
        return next(err);
    }
};
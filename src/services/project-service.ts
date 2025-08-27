import { Request } from "express";
import { FilterQuery, ObjectId } from "mongoose";

import _ from "lodash";

import Project, { ProjectDocument } from "../models/project-model";

import { getNewHistory } from "../helpers/history-helper";

import { addHistoryInfo } from "./history-service";
import socketService from "./socket-service";

export const getProjectInfoByFilterQuery = async (query: FilterQuery<ProjectDocument>) => {
    try {
        return await Project.findOne(query);
    } catch (err: any) {
        throw err;
    }
};

export const getProjectsByFilterQuery = async (query: FilterQuery<ProjectDocument>, session?: any) => {
    try {
        return await Project.find(query).session(session);
    } catch (err: any) {
        throw err;
    }
};

export const addProjectInfo = async (req: Request) => {
    const session = await Project.startSession();
    session.startTransaction();

    const opts = { session: session };

    try {
        //@ts-ignore
        const loggedInUserInfo = req.user;

        if (!loggedInUserInfo) {
            const customError: any = new Error("You are not Authorized");
            customError.statusCode = 401;
            throw customError;
        }

        const createdBy = loggedInUserInfo._id;

        const projectData: any  = req.body;
    
        const project: any = await Project.create(projectData, opts);

        const history: any = [];
        const changes = { newValue: projectData.projectTitle };
        history.push(await getNewHistory("create_new_project", project._id, createdBy, changes, { roleTitle: loggedInUserInfo.role }));

        const histories: any = await addHistoryInfo(history, opts);

        await session.commitTransaction();
        session.endSession();

        const populatedProject = await Project.findById(project._id)
                .populate("createdBy", "name email")
                .populate("userIds", "name email");
            
        socketService.notifyProjectMembers(
            populatedProject, 
            projectData.userIds
        );

        return project;

    } catch (err: any) {
        await session.abortTransaction();
        session.endSession();

        throw err;
    }
};

export const updateProjectInfo = async (req: Request) => {
    const session = await Project.startSession();
    session.startTransaction();

    const opts = { session: session };

    try {

        //@ts-ignore
        const loggedInUserInfo = req.user;

        if (!loggedInUserInfo) {
            const customError: any = new Error("You are not Authorized");
            customError.statusCode = 401;
            throw customError;
        }

        const createdBy = loggedInUserInfo._id;

    

        await session.commitTransaction();
        session.endSession();

        return ;

    } catch (err: any) {
        await session.abortTransaction();
        session.endSession();

        throw err;
    }
};
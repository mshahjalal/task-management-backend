import { Request } from "express";
import { FilterQuery, ObjectId } from "mongoose";

import _ from "lodash";

import Role, { RoleDocument, RoleChangeInput } from "../models/role-model";
import { getNewHistory } from "../helpers/history-helper";
import { addHistoryInfo } from "./history-service";

export const getRoleInfoByFilterQuery = async (query: FilterQuery<RoleDocument>) => {
    try {
        return await Role.findOne(query);
    } catch (err: any) {
        throw err;
    }
};

export const getRolesByFilterQuery = async (query: FilterQuery<RoleDocument>, session?: any) => {
    try {
        return await Role.find(query).session(session);
    } catch (err: any) {
        throw err;
    }
};

//Verify permissions according to user
export const verifyPermission = async (user: any, requiredPermissions: String[], optionalPermissions?: String[]) => {
    try {
        //Get all active permissions based on user
        //and return all active permissions
        const permissions = await getPermissionsByUser(user._id);

        const matchedPermissions = _.intersection(requiredPermissions, permissions);

        if (_.size(matchedPermissions) === _.size(requiredPermissions)) {
            return _.union(matchedPermissions, _.intersection(optionalPermissions, permissions));
        } else {
            const customError: any = new Error("Unauthorized user");
            customError.statusCode = 401;
            throw customError;
        }

    } catch (err: any) {
        throw err;
    }
};

//Get all permissions according to user
export const getPermissionsByUser = async (userId: ObjectId, requiredPermissions?: String[]) => {
    try {
        let permissions: String[] = [];

        const query: FilterQuery<RoleDocument> = { active: true };

        if (!userId) return permissions;
        else query.userIds = { $in: [userId] };

        if (_.size(requiredPermissions)) query.permissions = { $in: requiredPermissions };

        const roles = await getRolesByFilterQuery(query);

        await Promise.all(
            _.each(roles, (roleInfo) => {
                permissions = _.union(permissions, roleInfo.permissions);
            })
        );

        permissions = _.compact(permissions);

        return permissions;

    } catch (err: any) {
        throw err;
    }
};

export const updateRoleTypeInfo = async (req: Request) => {
    const session = await Role.startSession();
    session.startTransaction();

    const opts = { session: session };
    
    try {
        const inputData: RoleChangeInput = req.body;

        const assigneeId = inputData.assigneeId;
        const newRoleType = inputData.roleType;

        //@ts-ignore
        const loggedInUserInfo = req.user;

        if (!loggedInUserInfo) {
            const customError: any = new Error("You are not Authorized");
            customError.statusCode = 401;
            throw customError;
        }

        const previousRoleInfo: any = await getRoleInfoByFilterQuery({ userIds: { $in: [assigneeId] }, superAdminUserId: assigneeId });

        if (previousRoleInfo && previousRoleInfo.roleType !== newRoleType) {
            const customError: any = new Error("You are not authorized for this user role update");
            customError.statusCode = 401;
            throw customError;
        }

        const roleInfo: any = await getRoleInfoByFilterQuery({ userIds: { $in: [assigneeId] } });

        if (roleInfo && roleInfo.roleType !== newRoleType) {
            const createdBy = loggedInUserInfo._id;
            let history: any = [];

            //assignee new role added
            const newRole = await Role.updateOne({ roleType: newRoleType }, { $addToSet: { userIds: assigneeId } }, opts);

            if (newRole) {
                //Remove assignee from previous role
                const removeRole = await Role.updateOne({ _id: roleInfo._id }, { $pull: { userIds: assigneeId } }, opts);

                //For activity information
                const changes = { oldValue: roleInfo.roleType, newValue: newRoleType };
                history.push(await getNewHistory("update_role_type", roleInfo._id, createdBy, changes, { createdByName: loggedInUserInfo.name }));

                const histories = await addHistoryInfo(history, opts);
            }
        }

        await session.commitTransaction();
        session.endSession();

        return roleInfo;

    } catch (err: any) {
        await session.abortTransaction();
        session.endSession();
        
        throw err;
    }
};
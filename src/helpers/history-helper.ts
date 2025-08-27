import { ObjectId } from "mongoose";
import _ from "lodash";

//Action infos
export const actionInfos = [
    // role history
    {
        action: "assign_role",
        collectionName: "roles",
        visibility: ["users"]
    },
    {
        action: "update_role_type",
        collectionName: "roles",
        visibility: ["users"]
    },
    {
        action: "create_new_project",
        collectionName: "projects",
        visibility: ["users", "projects"]
    }
];

//Getting action related infos from action name
export const getActionInfosByActionName = async (actionName: String) => {
    return _.find(actionInfos, (info) => {
        return info && info.action === actionName;
    });
};

//New history creation by action and returns data to an array.
export const getNewHistory = async (actionName: string, collectionId: ObjectId, createdBy: ObjectId, changes?: any | null, data?: any | null) => {

    const actionInfo = await getActionInfosByActionName(actionName) || {}
    let historyData = {
        ...actionInfo,
        collectionId,
        changes,
        createdBy
    };

    if (data) {
        historyData = { ...historyData, ...data }
    };

    if (changes) {
        historyData = { ...historyData, changes }
    };

    return historyData;
};
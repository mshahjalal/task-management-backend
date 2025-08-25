import { ObjectId } from "mongoose";

import History, { HistoryDocument } from "../models/history-model";


//pull history info by history id if exists
export const getHistoryInfo = async (id: ObjectId) => {
    try {
        return await History.findById(id);
    } catch (err: any) {
        throw err;
    }
};

//Add history info to Database
export const addHistoryInfo = async (input: [Partial<HistoryDocument>], opts?: any) => {
    try {
        return await History.create(input, opts);
    } catch (err: any) {
        throw err;
    }
};
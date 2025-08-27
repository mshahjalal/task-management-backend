import mongoose, { ObjectId } from "mongoose";

const HistoryChangesSchema = {
    oldValue: String,
    newValue: String,
};

export interface HistoryDocument extends mongoose.Document {
    action: String;
    collectionName: String;
    collectionId: ObjectId;
    visibility: [String];
    changes: {
        oldValue: String;
        newValue: String;
    };
    roleTitle: String;
    createdBy: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const HistorySchema = new mongoose.Schema(
    {
        action: {
            type: String,
            required: true
        },
        collectionName: {
            type: String,
            required: true
        },
        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        visibility: [String],
        changes: HistoryChangesSchema,
        roleTitle: String,
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
    },
    { timestamps: true }
);
  
const History = mongoose.model<HistoryDocument>("History", HistorySchema);
  
export default History;
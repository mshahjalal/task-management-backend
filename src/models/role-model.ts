import mongoose from "mongoose";

export interface RoleDocument extends mongoose.Document {
    roleTitle: String;
    roleType: String;
    active: Boolean;
    permissions: String[];
    userIds: [mongoose.Schema.Types.ObjectId];
    superAdminUserId: mongoose.Schema.Types.ObjectId;
    createdBy: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export interface RoleChangeInput {
    assigneeId: mongoose.Schema.Types.ObjectId;
    roleType: String;
};

export const RoleSchema = new mongoose.Schema(
    {
        roleTitle: {
            type: String,
            required: true
        },
        roleType: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        },
        active: {
            type: Boolean,
            default: false
        },
        permissions: {
            type: [String],
            required: true
        },
        userIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        superAdminUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

const Role = mongoose.model<RoleDocument>("Role", RoleSchema);

export default Role;
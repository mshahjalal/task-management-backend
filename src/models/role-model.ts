import mongoose from "mongoose";

export interface RoleDocument extends mongoose.Document {
    roleTitle: String;
    roleType: String;
    active: Boolean;
    default: Boolean;
    permissions: String[];
    userIds: [mongoose.Types.ObjectId];
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export interface RoleChangeInput {
    assigneeId: mongoose.Types.ObjectId;
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
            required: true
        },
        active: {
            type: Boolean,
            default: false
        },
        default: {
            type: Boolean,
            default: false
        },
        permissions: {
            type: [String],
            required: true
        },
        userIds: [mongoose.Types.ObjectId],
        superAdminUserId: mongoose.Types.ObjectId,
        createdBy: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    { timestamps: true }
);

const Role = mongoose.model<RoleDocument>("Role", RoleSchema);

export default Role;
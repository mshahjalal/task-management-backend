import mongoose from "mongoose";

export interface ProjectDocument extends mongoose.Document {
    projectTitle: String;
    description: String;
    status: String;
    startDate: Date;
    endDate: Date;
    userIds: [mongoose.Schema.Types.ObjectId];
    createdBy: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const ProjectSchema = new mongoose.Schema(
    {
        projectTitle: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        status: {
            type: String,
            required: true
        },
        startDate: Date,
        endDate: Date,
        userIds: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        }
    },
    { timestamps: true }
);

const Project = mongoose.model<ProjectDocument>("Project", ProjectSchema);

export default Project;
import mongoose from "mongoose";

export interface ProjectDocument extends mongoose.Document {
    projectTitle: String;
    description: String;
    status: String;
    userIds: [mongoose.Types.ObjectId];
    createdBy: mongoose.Types.ObjectId;
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
        userIds: [mongoose.Types.ObjectId],
        createdBy: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    { timestamps: true }
);

const Project = mongoose.model<ProjectDocument>("Project", ProjectSchema);

export default Project;
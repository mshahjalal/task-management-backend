import mongoose from "mongoose";

export interface TaskDocument extends mongoose.Document {
    taskTitle: String;
    description: String;
    status: String;
    priority: String;
    dueDate: Date;
    projectId: mongoose.Schema.Types.ObjectId;
    userIds: [mongoose.Schema.Types.ObjectId];
    createdBy: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const TaskCommentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        comment: {
            type: String,
        },
        commentDate: {
            type: Date
        }
    }
);

export const TaskSchema = new mongoose.Schema(
    {
        taskTitle: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        status: {
            //here status will be board section type
            type: String,
            required: true
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "low"
        },
        dueDate: {
            type: Date,
        },
        comments: [TaskCommentSchema],
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        },
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

const Task = mongoose.model<TaskDocument>("Task", TaskSchema);

export default Task;
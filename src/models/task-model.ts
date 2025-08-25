import mongoose from "mongoose";

export interface TaskDocument extends mongoose.Document {
    taskTitle: String;
    description: String;
    status: String;
    projectId: mongoose.Types.ObjectId;
    userIds: [mongoose.Types.ObjectId];
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

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
        comments: [
            {
                userId: {
                    type: mongoose.Types.ObjectId,
                },
                comment: {
                    type: String,
                },
                commentDate: {
                    type:Date
                }
            }
        ],
        projectId: mongoose.Types.ObjectId,
        userIds: [mongoose.Types.ObjectId],
        createdBy: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    { timestamps: true }
);

const Task = mongoose.model<TaskDocument>("Task", TaskSchema);

export default Task;
import mongoose from "mongoose";

export interface BoardSectionDocument extends mongoose.Document {
    sectionTitle: String;
    sectionType: String;
    active: Boolean;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};

export const BoardSectionSchema = new mongoose.Schema(
    {
        sectionTitle: {
            type: String,
            required: true
        },
        sectionType: {
            type: String,
            unique: true,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    { timestamps: true }
);

const BoardSection = mongoose.model<BoardSectionDocument>("board-sections", BoardSectionSchema);

export default BoardSection;
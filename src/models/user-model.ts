import mongoose from "mongoose";

export interface UserTokenDocument {
    _id: mongoose.Types.ObjectId;
    name: String;
    email: String;
    active: Boolean;
    permissions?: String[];
};

export interface UserInput {
    name: String;
    email: String;
    password: string;
};

export interface UserDocument extends UserInput, mongoose.Document {
    active: Boolean;
    createdAt: Date;
    updatedAt: Date;
};

export const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
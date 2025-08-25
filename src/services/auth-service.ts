import { Request } from "express";
import { FilterQuery, ObjectId } from "mongoose";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import _ from "lodash";

//import model
import User, { UserInput, UserDocument, UserTokenDocument } from "../models/user-model";
import { getPermissionsByUser } from "./role-service";

//find user info according to filter query
export const getUserInfoByFilterQuery = async (query: FilterQuery<UserDocument>, session?: any) => {
    try {
        return await User.findOne(query).session(session);
    } catch (err: any) {
        throw err;
    }
};

//Generate hashed password with salts
export const createHashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(config.get<number>("SALT_ROUNDS"));

    return await bcrypt.hash(password, salt);
};

//Compare given password
export const comparePassword = async (password: string, hashPassword: string) => {
    return await bcrypt.compare(password, hashPassword);
};

//Generate token by user information
const generateToken = async (user: Partial<UserTokenDocument>) => {
    return jwt.sign(user, config.get<string>("JWT_SECRET"), { expiresIn: '7d' });
};

//Get token according to user
export const getToken = async (user: any) => {
    //set some information of user for token generate
    const usertoken: Partial<UserTokenDocument> = _.pick(user, ["_id", "name", "email", "active"]);

    //get all active permissions based on user
    //and set all permissions in token
    const permissions = await getPermissionsByUser(user._id);

    if (_.size(permissions)) usertoken.permissions = permissions;

    return await generateToken(usertoken);
};

//Verify user token
export const verifyToken = async (token: string) => {
    const splitedToken = token ? token.split("Bearer") : '';
    const user: any = splitedToken && splitedToken[1] ? jwt.verify(splitedToken[1], config.get<string>("JWT_SECRET")) : false;

    let customError: any = {};

    if (!user) {
        customError = new Error("Bat token format!");
        customError.statusCode = 400;
        throw customError;
    }

    const userInfo = (user && user._id) ? await getUserInfoByFilterQuery({ _id: user._id, active: true }) : false;

    if (userInfo) return userInfo;
    else {
        customError = new Error("Invalid token!");
        customError.statusCode = 400;
        throw customError;
    }
};

//Check login credentials with database
//User can login with email and password
export const login = async (loginData: UserInput) => {
    try {
        let customError: any = {};

        const user: any = await getUserInfoByFilterQuery({ email: loginData.email });

        if (!user) {
            customError = new Error("You provided email and password combination didn't match!");
            customError.statusCode = 400;
            throw customError;
        }

        if (!user.active) {
            customError = new Error("Your has been deleted or deactivated. For more information contact us");
            customError.statusCode = 400;
            throw customError;
        }

        if (await comparePassword(loginData.password, user.password)) {
            return await getToken(user);
        } else {
            customError = new Error("The password you provided didn't match with our records!");
            customError.statusCode = 400;
            throw customError;
        }
    } catch (err: any) {
        throw err;
    }
};

//Check if an email already exist in Database
export const emailAlreadyIsNotExists = async (email: string, id?: ObjectId) => {
    const query: any = { email: email };

    if (id) query._id = { $ne: id };

    const user: any = await getUserInfoByFilterQuery(query);

    if (user) {
        const customError: any = new Error("Sorry, this email was used to create an account. Please use a new email.");
        customError.statusCode = 400;
        throw customError;
    }

    if (user) {

        throw new Error("Email already in use!");
        return;

    } else return true;
};

export const createUser = async (req: Request) => {
    try {
        const input: any = _.pick(req.body, ["name", "email", "password"]);;
        const inputData: any = _.clone(input);

        inputData.password = await createHashPassword(input.password);
        inputData.active = true;

        return await User.create(inputData);

    } catch (err: any) {
        throw err;
    }
};
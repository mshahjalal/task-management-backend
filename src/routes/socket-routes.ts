import { Router } from "express";
import { successResponseHandler } from "../middleware/success-response-handler";
import socketService from "../services/socket-service";
import { authenticate } from "../middleware/auth";

const socketRouter = Router();

socketRouter.get("/connected-users/count", authenticate, async (req, res, next) => {
    try {
        const count = socketService.getConnectedUsersCount();

        return await successResponseHandler(res, 200, "Connected users count fetch successfully!", "count", count);
    } catch (err) {
        return next(err);
    }
});

socketRouter.get("/user/:userId/online", authenticate, async (req, res, next) => {
    try {
        const { userId } = req.params;

        const isOnline = socketService.isUserOnline(userId);

        return await successResponseHandler(res, 200, "User online status fetch successfully!", "isOnline", isOnline);
    } catch (err) {
        return next(err);
    }
});

socketRouter.get("/user/:userId/info", authenticate, async (req, res, next) => {
    try {
        const { userId } = req.params;

        const userInfo = socketService.getUserById(userId);

        return await successResponseHandler(res, 200, "User socket info fetch successfully!", "userInfo", userInfo);
    } catch (err) {
        return next(err);
    }
});

export default socketRouter;

import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    err.statusCode = err.statusCode || err.code || 5000;
    err.message = err.message || "Internal server error!";

    if (err.name === 'CastError' || err.name === "JsonWebTokenError" || err.name === "NotBeforeError") {
        err.statusCode = 400;
    } else if ((err.name === 'MongoError' || err.name === "MongoBulkWriteError") && err.code === 11000) {
        err.statusCode = 409;
    } else if (err.name === 'TokenExpiredError') {
        err.statusCode = 401;

        if (err.expiredAt) err.expiredAt = err.expiredAt;
    }

    res.status(err.statusCode).json({
        status: "error",
        statusCode: err.statusCode,
        message: err.message
    });
};
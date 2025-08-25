import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const ValidateRequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        //Send single error message. Get first error message.
        const firstError = errors.array()[0];
        const errorMessage = firstError.msg || 'Validation failed';

        return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: errorMessage,
            field: firstError.type === "field" ? firstError.path : "unknown"
        });
    }

    return next();
};

export default ValidateRequestHandler;
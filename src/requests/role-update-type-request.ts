import { body } from "express-validator";

const RoleUpdateTypeRequest: any = [
    body("assigneeId").exists().trim().notEmpty().isMongoId().withMessage("Assignee is required"),
    body("roleType").exists().trim().notEmpty().isString().withMessage("Role is required"),
];

export default RoleUpdateTypeRequest;
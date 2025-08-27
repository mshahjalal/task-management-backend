import { body } from "express-validator";

const ProjectAddRequest: any = [
    body("projectTitle").exists().trim().isString().notEmpty().withMessage("Project title is required"),
    body("description").exists().trim().isString().notEmpty().withMessage("Description is required"),
    body("status").exists().trim().isString().notEmpty().withMessage("Status is required"),
    body("startDate").optional().trim().isDate().notEmpty().withMessage("Select start date"),
    body("endDate").optional().trim().isDate().notEmpty().withMessage("Select end date"),
    body("userId").exists().trim().isMongoId().withMessage("select project manager"),
];

export default ProjectAddRequest;
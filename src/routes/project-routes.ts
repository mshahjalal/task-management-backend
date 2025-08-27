import express from "express";

//import middleware files
import ValidateRequestHandler from "../middleware/validate-request-handler";
import { authenticate } from "../middleware/auth";
import { authorization } from "../middleware/permission";

//import request files
import ProjectAddRequest from "../requests/project-add-request";
import ProjectUpdateRequest from "../requests/project-update-request";

//import controllers
import { addInfo, getAll, getInfo, updateInfo } from "../controllers/project-controller";

const projectRouter = express.Router();

projectRouter.use(authenticate);

projectRouter.post("/create", authorization(["add_project"]), ProjectAddRequest, ValidateRequestHandler, addInfo);
projectRouter.put("/update", authorization(["edit_project", "view_project"]), ProjectUpdateRequest, ValidateRequestHandler, updateInfo);
projectRouter.get("/", authorization(["view_project"]), ValidateRequestHandler, getAll);
projectRouter.get("/:id", authorization(["view_project"]), ValidateRequestHandler, getInfo);

export default projectRouter;
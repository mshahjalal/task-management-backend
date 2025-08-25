import express from "express";

//import middleware files
import ValidateRequestHandler from "../middleware/validate-request-handler";
import { authenticate } from "../middleware/auth";
import { authorization } from "../middleware/permission";

//import request files
import RoleUpdateTypeRequest from "../requests/role-update-type-request";

//import controllers
import { updateTypeInfo } from "../controllers/role-controller";

const roleRouter = express.Router();

roleRouter.put("/update-type", authenticate, authorization(["edit_role", "view_role"]), RoleUpdateTypeRequest, ValidateRequestHandler, updateTypeInfo);

export default roleRouter;
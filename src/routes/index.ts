import { Router } from "express";

//import route files
import userRouter from "./user-routes";
import roleRouter from "./role-routes";

const router = Router();

router.use("/v1/users", userRouter);
router.use("/v1/roles", roleRouter);

router.get("/", (req, res) => {
    res.send("Task management backend health is now ok");
});

router.all("*", (req, res) => {
    res.status(404).send("404 Not Found");
});

export default router;
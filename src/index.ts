import express from "express";
import cors from "cors";
import helmet from "helmet";
import config from "config";
import moment from "moment-timezone";

import dbConnection from "./db-connection/db-connection";
import { errorHandler } from "./middleware/error-handler";
import logger from "./utils/logger";
import router from "./routes/index";


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //Parse json
app.use(cors()); //Enable cors
app.use(helmet()); //Basic security headers

moment.tz.setDefault('Asia/Dhaka');

//Database connection
dbConnection();

//Add routes
app.use("/api", router);

//Handling errors
app.use(errorHandler);

//Server
const port = config.get<number>('PORT') || 5001;
app.listen(port, async () => {
    logger.info(`Application successfully connected on http://localhost:${port}`);
});
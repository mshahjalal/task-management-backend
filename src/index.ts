import express from "express";
import cors from "cors";
import helmet from "helmet";
import config from "config";
import moment from "moment-timezone";
import { createServer } from "http";

import dbConnection from "./db-connection/db-connection";
import { errorHandler } from "./middleware/error-handler";
import logger from "./utils/logger";
import router from "./routes/index";
import socketService from "./services/socket-service";

const app = express();
const server = createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //Parse json
app.use(cors()); //Enable cors
app.use(helmet()); //Basic security headers

moment.tz.setDefault('Asia/Dhaka');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
    next();
});

//Database connection
dbConnection();

//Initialize Socket.IO
socketService.initialize(server);

//Add routes
app.use("/api", router);

//Handling errors
app.use(errorHandler);

//Server
const port = config.get<number>('PORT') || 5001;
server.listen(port, async () => {
    logger.info(`Application successfully connected on http://localhost:${port}`);
    logger.info(`Socket.IO is running on the same port`);
});
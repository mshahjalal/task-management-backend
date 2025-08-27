import mongoose, { ConnectOptions } from "mongoose";
import config from "config";

import logger from "../utils/logger";

const createDBConnection = async () => {
    const NODE_ENV = config.get<string>("NODE_ENV");
    const MONGO_USER = config.get<string>("MONGO_USER");
    const MONGO_PASSWORD = config.get<string>("MONGO_PASSWORD");
    const MONGO_CLUSTER = config.get<string>("MONGO_CLUSTER");
    const MONGO_DB_NAME = config.get<string>("MONGO_DB_NAME");
    const MONGO_PORT = config.get<string>("MONGO_PORT");

    //mongodb connection information
    const mongoConnectionUri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
    const mongoDbConnectionURI = NODE_ENV === "local_development" ? `mongodb://localhost:${MONGO_PORT}/${MONGO_DB_NAME}` : (NODE_ENV === "development" ? mongoConnectionUri : mongoConnectionUri);

    try {
        await mongoose.connect(mongoDbConnectionURI);
        logger.info("Successfully connected to database");
    } catch (error) {
        logger.error("Could not connect to database");
        process.exit(1);
    }
};

export default createDBConnection;

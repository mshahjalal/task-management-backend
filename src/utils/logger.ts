import logger from "pino";
import moment from "moment-timezone";
import { colorizerFactory } from "pino-pretty";
import { pid } from "process";

const log = logger({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${moment().format()}"`
});

export default log;
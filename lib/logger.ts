// lib/logger.ts
import winston from "winston";

const { combine, timestamp, printf, colorize, json } = winston.format;

// Custom format for console logging with colors
const consoleFormat = printf(({ level, message, timestamp, ...metadata }) => {
    let msg = `${timestamp} [${level}] : ${message} `;
    if (Object.keys(metadata).length > 0) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
    transports: [
        // In production, we can add file transports or external logging services here
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "logs/app.log" }),
    ],
});

// If we're not in production, log to the `console` with a simple, colorful format.
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: combine(colorize(), consoleFormat),
        })
    );
}

export default logger;

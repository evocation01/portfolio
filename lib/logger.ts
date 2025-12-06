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

const transports = [];

// Always add console transport (for all environments, though it will be less verbose in production)
transports.push(
    new winston.transports.Console({
        format: combine(colorize(), consoleFormat),
        level: process.env.NODE_ENV === "production" ? "info" : "debug", // Control verbosity in console
    }) as any
);

// Add file transports ONLY in non-production environments
if (process.env.NODE_ENV !== "production") {
    transports.push(
        new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
        }),
        new winston.transports.File({ filename: "logs/app.log" })
    );
}

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
    transports,
});

export default logger;

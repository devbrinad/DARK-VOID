import BaseEngine from "./BaseEngine.js";

export default class LoggerEngine extends BaseEngine {
    constructor() {
        super("Logger Engine");

        this.logs = [];
    }

    async start() {
        try {
            await super.start();

            this.info("Logger Engine started");

            return {
                logs: this.logs.length
            };
        } catch (error) {
            this.fail(error);
            throw error;
        }
    }

    info(message) {
        this.write("INFO", message);
    }

    warn(message) {
        this.write("WARN", message);
    }

    error(message) {
        this.write("ERROR", message);
    }

    write(level, message) {
        const entry = {
            level,
            message,
            timestamp: new Date().toISOString()
        };

        this.logs.push(entry);
    }

    getLogs() {
        return [...this.logs];
    }

    clear() {
        this.logs = [];
    }
}

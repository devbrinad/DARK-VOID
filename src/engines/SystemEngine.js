import os from "os";
import BaseEngine from "./BaseEngine.js";

export default class SystemEngine extends BaseEngine {
    constructor() {
        super("System Engine");

        this.info = {};
    }

    async start() {
        try {
            this.info = {
                platform: os.platform(),
                architecture: os.arch(),
                hostname: os.hostname(),
                cpu: os.cpus()[0]?.model || "Unknown CPU",
                cores: os.cpus().length,
                memory: {
                    total: this.formatBytes(os.totalmem()),
                    free: this.formatBytes(os.freemem()),
                    used: this.formatBytes(
                        os.totalmem() - os.freemem()
                    )
                },
                uptime: this.formatUptime(os.uptime()),
                node: process.version
            };

            await super.start();

            return this.info;
        } catch (error) {
            this.fail(error);
            throw error;
        }
    }

    getInfo() {
        return this.info;
    }

    formatBytes(bytes) {
        const units = ["B", "KB", "MB", "GB", "TB"];

        let index = 0;
        let size = bytes;

        while (
            size >= 1024 &&
            index < units.length - 1
        ) {
            size /= 1024;
            index++;
        }

        return `${size.toFixed(2)} ${units[index]}`;
    }

    formatUptime(seconds) {
        const days = Math.floor(seconds / 86400);
        seconds %= 86400;

        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;

        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${days}d ${hours}h ${minutes}m ${secs}s`;
    }
}

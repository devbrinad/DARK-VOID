import BaseEngine from "./BaseEngine.js";

export default class ConfigEngine extends BaseEngine {
    constructor() {
        super("Config Engine");

        this.config = {
            name: "DARK VOID",
            version: "1.0.0-GENESIS",
            prefix: "!",
            environment: "development"
        };
    }

    async start() {
        try {
            await super.start();

            return this.config;
        } catch (error) {
            this.fail(error);
            throw error;
        }
    }

    get(key) {
        return this.config[key];
    }

    set(key, value) {
        this.config[key] = value;
    }

    getAll() {
        return {
            ...this.config
        };
    }
}

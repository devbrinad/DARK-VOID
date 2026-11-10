import BaseEngine from "./BaseEngine.js";

export default class DatabaseEngine extends BaseEngine {
    constructor() {
        super("Database Engine");

        this.data = new Map();
    }

    async start() {
        try {
            await super.start();

            return {
                entries: this.data.size
            };
        } catch (error) {
            this.fail(error);
            throw error;
        }
    }

    set(key, value) {
        this.data.set(key, value);

        return value;
    }

    get(key) {
        return this.data.get(key);
    }

    has(key) {
        return this.data.has(key);
    }

    delete(key) {
        return this.data.delete(key);
    }

    clear() {
        this.data.clear();
    }

    size() {
        return this.data.size;
    }

    getAll() {
        return Object.fromEntries(this.data);
    }
}

import BaseEngine from "./BaseEngine.js";

export default class PluginEngine extends BaseEngine {
    constructor() {
        super("Plugin Engine");

        this.plugins = new Map();
    }

    async start() {
        try {
            await super.start();

            return {
                plugins: this.plugins.size
            };
        } catch (error) {
            this.fail(error);
            throw error;
        }
    }

    register(name, plugin) {
        if (
            typeof name !== "string" ||
            !name.trim()
        ) {
            throw new TypeError(
                "Plugin name must be a non-empty string"
            );
        }

        if (!plugin || typeof plugin !== "object") {
            throw new TypeError(
                `Plugin "${name}" must be an object`
            );
        }

        if (this.plugins.has(name)) {
            throw new Error(
                `Plugin already registered: ${name}`
            );
        }

        const entry = {
            name: name.trim(),
            plugin,
            status: "registered"
        };

        this.plugins.set(entry.name, entry);

        return entry;
    }

    get(name) {
        return this.plugins.get(name);
    }

    has(name) {
        return this.plugins.has(name);
    }

    async startPlugin(name) {
        const entry = this.plugins.get(name);

        if (!entry) {
            throw new Error(
                `Plugin not found: ${name}`
            );
        }

        if (
            typeof entry.plugin.start === "function"
        ) {
            await entry.plugin.start();
        }

        entry.status = "online";

        return entry;
    }

    async stopPlugin(name) {
        const entry = this.plugins.get(name);

        if (!entry) {
            throw new Error(
                `Plugin not found: ${name}`
            );
        }

        if (
            typeof entry.plugin.stop === "function"
        ) {
            await entry.plugin.stop();
        }

        entry.status = "stopped";

        return entry;
    }

    unregister(name) {
        return this.plugins.delete(name);
    }

    list() {
        return [...this.plugins.values()].map(
            entry => ({
                name: entry.name,
                status: entry.status
            })
        );
    }

    count() {
        return this.plugins.size;
    }

    clear() {
        this.plugins.clear();
    }
}

import BaseEngine from "./BaseEngine.js";

export default class CommandEngine extends BaseEngine {
    constructor() {
        super("Command Engine");

        this.commands = new Map();
    }

    async start() {
        try {
            await super.start();

            return {
                commands: this.commands.size
            };
        } catch (error) {
            this.fail(error);
            throw error;
        }
    }

    register(name, handler, options = {}) {
        if (typeof name !== "string" || !name.trim()) {
            throw new TypeError(
                "Command name must be a non-empty string"
            );
        }

        if (typeof handler !== "function") {
            throw new TypeError(
                `Handler for "${name}" must be a function`
            );
        }

        const command = {
            name: name.trim(),
            handler,
            description: options.description || "",
            aliases: Array.isArray(options.aliases)
                ? options.aliases
                : []
        };

        this.commands.set(command.name, command);

        for (const alias of command.aliases) {
            this.commands.set(alias, command);
        }

        return command;
    }

    get(name) {
        return this.commands.get(name);
    }

    has(name) {
        return this.commands.has(name);
    }

    async execute(name, ...args) {
        const command = this.get(name);

        if (!command) {
            throw new Error(
                `Command not found: ${name}`
            );
        }

        return await command.handler(...args);
    }

    unregister(name) {
        const command = this.get(name);

        if (!command) {
            return false;
        }

        this.commands.delete(command.name);

        for (const alias of command.aliases) {
            this.commands.delete(alias);
        }

        return true;
    }

    list() {
        const uniqueCommands = new Map();

        for (const command of this.commands.values()) {
            uniqueCommands.set(command.name, command);
        }

        return [...uniqueCommands.values()].map(
            command => ({
                name: command.name,
                description: command.description,
                aliases: [...command.aliases]
            })
        );
    }

    count() {
        const uniqueCommands = new Set(
            [...this.commands.values()].map(
                command => command.name
            )
        );

        return uniqueCommands.size;
    }

    clear() {
        this.commands.clear();
    }
}

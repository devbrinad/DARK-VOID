import BaseEngine from "./BaseEngine.js";

export default class EventEngine extends BaseEngine {
    constructor() {
        super("Event Engine");

        this.events = new Map();
    }

    async start() {
        try {
            await super.start();

            return {
                events: this.events.size
            };
        } catch (error) {
            this.fail(error);
            throw error;
        }
    }

    on(event, listener) {
        if (typeof listener !== "function") {
            throw new TypeError(
                "Event listener must be a function"
            );
        }

        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }

        this.events.get(event).add(listener);

        return this;
    }

    off(event, listener) {
        const listeners = this.events.get(event);

        if (!listeners) {
            return false;
        }

        const removed = listeners.delete(listener);

        if (listeners.size === 0) {
            this.events.delete(event);
        }

        return removed;
    }

    emit(event, ...args) {
        const listeners = this.events.get(event);

        if (!listeners) {
            return false;
        }

        for (const listener of listeners) {
            listener(...args);
        }

        return true;
    }

    once(event, listener) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            listener(...args);
        };

        return this.on(event, wrapper);
    }

    has(event) {
        return this.events.has(event);
    }

    listenerCount(event) {
        return this.events.get(event)?.size || 0;
    }

    eventNames() {
        return [...this.events.keys()];
    }

    removeAllListeners(event) {
        if (event === undefined) {
            this.events.clear();
            return;
        }

        this.events.delete(event);
    }
}

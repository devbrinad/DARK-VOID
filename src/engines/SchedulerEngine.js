import BaseEngine from "./BaseEngine.js";

export default class SchedulerEngine extends BaseEngine {
    constructor() {
        super("Scheduler Engine");

        this.tasks = new Map();
        this.nextId = 1;
    }

    async start() {
        try {
            await super.start();

            return {
                tasks: this.tasks.size
            };
        } catch (error) {
            this.fail(error);
            throw error;
        }
    }

    every(interval, handler) {
        if (typeof interval !== "number" || interval <= 0) {
            throw new TypeError(
                "Interval must be a positive number"
            );
        }

        if (typeof handler !== "function") {
            throw new TypeError(
                "Scheduler handler must be a function"
            );
        }

        const id = this.nextId++;

        const timer = setInterval(
            handler,
            interval
        );

        this.tasks.set(id, {
            id,
            type: "interval",
            interval,
            timer,
            status: "running"
        });

        return id;
    }

    after(delay, handler) {
        if (typeof delay !== "number" || delay < 0) {
            throw new TypeError(
                "Delay must be a non-negative number"
            );
        }

        if (typeof handler !== "function") {
            throw new TypeError(
                "Scheduler handler must be a function"
            );
        }

        const id = this.nextId++;

        const timer = setTimeout(() => {
            handler();

            const task = this.tasks.get(id);

            if (task) {
                task.status = "completed";
            }
        }, delay);

        this.tasks.set(id, {
            id,
            type: "timeout",
            delay,
            timer,
            status: "scheduled"
        });

        return id;
    }

    cancel(id) {
        const task = this.tasks.get(id);

        if (!task) {
            return false;
        }

        if (task.type === "interval") {
            clearInterval(task.timer);
        } else {
            clearTimeout(task.timer);
        }

        task.status = "cancelled";

        this.tasks.delete(id);

        return true;
    }

    get(id) {
        return this.tasks.get(id);
    }

    list() {
        return [...this.tasks.values()].map(
            task => ({
                id: task.id,
                type: task.type,
                status: task.status
            })
        );
    }

    count() {
        return this.tasks.size;
    }

    stopAll() {
        for (const id of this.tasks.keys()) {
            this.cancel(id);
        }
    }
}

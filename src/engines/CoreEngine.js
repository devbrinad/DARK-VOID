import BaseEngine from "./BaseEngine.js";

export default class CoreEngine extends BaseEngine {
    constructor() {
        super("Core Engine");

        this.initializedAt = null;
        this.state = "idle";
    }

    async start() {
        try {
            this.state = "starting";

            this.initializedAt = new Date();

            this.state = "running";

            await super.start();

            return {
                state: this.state,
                initializedAt: this.initializedAt
            };
        } catch (error) {
            this.fail(error);
            throw error;
        }
    }

    getState() {
        return this.state;
    }

    getInitializedAt() {
        return this.initializedAt;
    }
}

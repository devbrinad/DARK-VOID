import BaseEngine from "./BaseEngine.js";

export default class PlaceholderEngine extends BaseEngine {
    constructor(name) {
        super(name);
    }

    async start() {
        await super.start();

        return {
            name: this.name,
            status: this.getStatus()
        };
    }
}

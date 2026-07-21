import BaseEngine from "./BaseEngine.js";

export default class CoreEngine extends BaseEngine {

    constructor() {
	super("Core Engine");
    }

    async start() {
	await super.start();
    }

}

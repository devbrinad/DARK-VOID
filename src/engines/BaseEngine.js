import STATUS from "../constants/status.js";

export default class BaseEngine {
    constructor(name) {
	this.name = name;
	this.status = STATUS.WAITING;
	this.error = null;
    }

    async start() {
	this.status = STATUS.ONLINE;
    }

    async stop() {
	this.status = STATUS.OFFLINE;
    }

    fail(error) {
	this.status = STATUS.FAILED;
	this.error = error;
    }

    getStatus() {
	return this.status;
    }

    getError() {
	return this.error;
    }
}

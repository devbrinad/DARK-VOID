import BaseEngine from "./BaseEngine.js";

export default class APIEngine extends BaseEngine {
    constructor() {

    super("API Engine");

    this.routes = new Map();
    }

    async start() {
    try {
            await super.start();

        return {
        routes: this.routes.size
        };
    } catch (error) {
        this.fail(error);
        throw error;
    }
    }

    register(method, path, handler) {
    if (
        typeof method!== "string" ||
        !method.trim()
    ) {
        throw new TypeError(
        "API method must be a non-empty string"
        );
    }

    if (
        typeof path!== "string" ||
        !path.trim()
    ) {
        throw new TypeError(
        "API path must be a non-empty string"
        );
    }

    if (typeof handler !== "function") {
        throw new TypeError(
        "API handler must be a function"
        );
    }

    const key =
        `${method.toUpperCase()} ${path}`;

    if (this.routes.has(key)) {
        throw new Error(
        `Route already registered: ${key}`
        );
    }

    const route = {
        method: method.toUpperCase(),
        path: path.trim(),
        };

    this.routes.set(key, route);

    return route;
    }

    get(path, handler) {
    return this.register(
        "GET",
        path,
        handler
    );
    }

    post(path, handler) {
    return this.register(
        "POST",
        path,
        handler
    );
    }

    put(path, handler) {
    return this.register(
        "PUT",
        path,
        handler
    );
    }

    delete(path, handler) {
    return this.register(
        "DELETE",
        path,
        handler
    );
    }

    find(method, path) {
    const key =
        `${method.toUpperCase()} ${path}`;

    return this.routes.get(key);
    }

    has(method, path) {
    return Boolean(
        this.find(method, path)
    );
    }

    list() {
    return [...this.routes.values()].map(
        route => ({
        method: route.method,
        path: route.path
        })
    );
    }

    count() {
    return this.routes.size;
    }

    unregister(method, path) {
    const key =
        `${method.toUpperCase()} ${path}`;

    return this.routes.delete(key);
    }

    clear() {
    this.routes.clear();
    };

}

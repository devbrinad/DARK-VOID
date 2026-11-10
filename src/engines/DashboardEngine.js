import BaseEngine from "./BaseEngine.js";

export default class DashboardEngine extends BaseEngine {
    constructor(engineManager) {
        super("Dashboard Engine");

        this.engineManager = engineManager;
    }

    async start() {
        try {
            if (!this.engineManager) {
                throw new Error(
                    "EngineManager reference is required"
                );
            }

            await super.start();

            return this.getSnapshot();
        } catch (error) {
            this.fail(error);
            throw error;
        }
    }

    getSnapshot() {
        const total =
            this.engineManager.getTotalCount();

        const online =
            this.engineManager.getOnlineCount();

        const failed =
            this.engineManager.getFailedCount();

        return {
            total,
            online,
            failed,
            allOnline:
                total > 0 &&
                online === total
        };
    }

    getEngineStatuses() {
        return this.engineManager.getStatus();
    }
}

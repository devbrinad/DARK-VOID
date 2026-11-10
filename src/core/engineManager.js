import bootState from "../ui/bootState.js";

import SystemEngine from "../engines/SystemEngine.js";
import WhatsAppEngine from "../engines/WhatsAppEngine.js";

import CoreEngine from "../engines/CoreEngine.js";
import LoggerEngine from "../engines/LoggerEngine.js";
import ConfigEngine from "../engines/ConfigEngine.js";
import DatabaseEngine from "../engines/DatabaseEngine.js";
import CommandEngine from "../engines/CommandEngine.js";
import EventEngine from "../engines/EventEngine.js";
import PluginEngine from "../engines/PluginEngine.js";
import SchedulerEngine from "../engines/SchedulerEngine.js";
import DashboardEngine from "../engines/DashboardEngine.js";
import APIEngine from "../engines/APIEngine.js";

class EngineManager {
    constructor() {
        this.engines = new Map();

        // ==============================
        // CORE ENGINES
        // ==============================

        this.register(
            "system",
            new SystemEngine()
        );

        this.register(
            "core",
            new CoreEngine()
        );

        this.register(
            "logger",
            new LoggerEngine()
        );

        this.register(
            "config",
            new ConfigEngine()
        );

        this.register(
            "database",
            new DatabaseEngine()
        );

        this.register(
            "commands",
            new CommandEngine()
        );

        this.register(
            "event",
            new EventEngine()
        );

        this.register(
            "plugins",
            new PluginEngine()
        );

        this.register(
            "scheduler",
            new SchedulerEngine()
        );

	this.register(
            "api",
            new APIEngine()
        );

        const whatsappEngine = new WhatsAppEngine(
	    (status, error) => {
	        this.updateBootState(
                    "whatsapp",
		    status,
		    error
		);
            }
        );

	whatsappEngine.engineManager = this;
	this.register(
	    "whatsapp",
	    whatsappEngine
	);

        // ==============================
        // DASHBOARD ENGINE
        // ==============================

        this.createDashboardEngine();
    }

    // ==============================
    // DASHBOARD ENGINE CREATION
    // ==============================

    createDashboardEngine() {
        const dashboard =
            new DashboardEngine(this);

        this.register(
            "dashboard",
            dashboard
        );
    }

    // ==============================
    // REGISTER ENGINE
    // ==============================

    register(id, engine) {
        this.engines.set(id, engine);
    }

    // ==============================
    // START ALL ENGINES
    // ==============================

    async startAll() {
        for (const [id, engine] of this.engines) {
            try {
                await engine.start();

                this.updateBootState(
                    id,
                    engine.getStatus(),
                    null
                );

            } catch (error) {
                this.updateBootState(
                    id,
                    "failed",
                    error.message
                );
            }
        }
    }

    // ==============================
    // UPDATE BOOT STATE
    // ==============================

    updateBootState(
        id,
        status,
        error
    ) {
        const state =
            bootState.find(
                item => item.id === id
            );

        if (!state) {
            return;
        }

        state.status = status;
        state.error = error;
    }

    // ==============================
    // GET ENGINE
    // ==============================

    get(id) {
        return this.engines.get(id);
    }

    // ==============================
    // GET ENGINE STATUS
    // ==============================

    getStatus() {
        return [
            ...this.engines.entries()
        ].map(
            ([id, engine]) => ({
                id,
                name: engine.name,
                status: engine.getStatus(),
                error: engine.getError()
            })
        );
    }

    // ==============================
    // ONLINE ENGINE COUNT
    // ==============================

    getOnlineCount() {
        return [
            ...this.engines.values()
        ].filter(
            engine =>
                engine.getStatus() ===
                "online"
        ).length;
    }

    // ==============================
    // TOTAL ENGINE COUNT
    // ==============================

    getTotalCount() {
        return this.engines.size;
    }

    // ==============================
    // FAILED ENGINE COUNT
    // ==============================

    getFailedCount() {
        return [
            ...this.engines.values()
        ].filter(
            engine =>
                engine.getStatus() ===
                "failed"
        ).length;
    }

    // ==============================
    // CHECK IF ALL ENGINES ARE ONLINE
    // ==============================

    allOnline() {
        const total =
            this.getTotalCount();

        const online =
            this.getOnlineCount();

        return (
            total > 0 &&
            online === total
        );
    }
}

export default new EngineManager();

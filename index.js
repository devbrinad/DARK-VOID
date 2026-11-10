import { bootScreen } from "./src/ui/boot.js";
import { startBot } from "./src/core/bot.js";
import { renderDashboard } from "./src/ui/dashboard.js";
import engineManager from "./src/core/engineManager.js";

await bootScreen();

await startBot();

const systemEngine = engineManager.get("system");

const systemInfo = systemEngine.getInfo();

renderDashboard({
    status: systemEngine.getStatus().toUpperCase(),

    uptime: systemInfo.uptime,

    memory: `${systemInfo.memory.used} / ${systemInfo.memory.total}`,

    commands: "Ready",
    plugins: "Ready",
    events: "Ready",
    database: "Ready",
    whatsapp: "Disconnected",

    owner: "DARK VOID",
    prefix: "!",
    version: "1.0.0-GENESIS",

    onlineEngines: engineManager.getOnlineCount(),
    totalEngines: engineManager.getTotalCount(),

    allEnginesOnline: engineManager.allOnline()
});

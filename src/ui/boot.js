import { startBoot } from "../core/bootManager.js";
import { center, progressBar } from "../lib/ui.js";
import theme from "./theme.js";
import bootState from "./bootState.js";

export async function bootScreen() {
    await startBoot(renderBoot);
}

function renderBoot() {
    console.clear();

    console.log(center(theme.framework));
    console.log(center("Intelligent Messaging Framework"));
    console.log("");
    console.log(center("🚀 VOID BOOT"));
    console.log("");

    for (const engine of bootState) {

    const statusIcon = theme.status[engine.status] || "?";
    const engineIcon = theme.icons[engine.id] || "?";

    console.log(
        `${engineIcon} ${engine.name.padEnd(25, ".")} ${statusIcon} ${engine.status}`
    );
}

const online = bootState.filter(
    engine => engine.status === "online"
).length;

console.log("");

console.log(progressBar(online, bootState.length));

}

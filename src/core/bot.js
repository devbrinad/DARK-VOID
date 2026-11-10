
import bootState from "../ui/bootState.js";
import engineManager from "./engineManager.js";

export async function startBot() {
    console.log("");

    // Start all registered engines
    await engineManager.startAll();

    // Get the real engine states
    const states = engineManager.getStatus();

    const total = states.length;

    const online = states.filter(
        engine => engine.status === "online"
    ).length;

    const failed = states.filter(
        engine => engine.status === "failed"
    ).length;

    // Determine the real system state
    const allOnline = total > 0 && online === total;
    const hasFailed = failed > 0;

    console.log("🚀 DARK VOID INITIALIZED");

    console.log(
        `🟢 ENGINES ONLINE: ${online}/${total}`
    );

    if (allOnline) {
        console.log("⚡ ALL SYSTEMS READY");
    } else if (hasFailed) {
        console.log(
            `🔴 SYSTEM DEGRADED: ${failed} ENGINE(S) FAILED`
        );
    } else {
        console.log(
            `🟡 SYSTEM INITIALIZING: ${online}/${total} ONLINE`
        );
    }

    console.log("");
}

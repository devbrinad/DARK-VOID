import { center } from "../lib/ui.js";
import theme from "./theme.js";

const WIDTH = 68;
const INNER = WIDTH - 2;

function line(char = "─") {
    return char.repeat(INNER);
}

function row(label, value) {
    const content = ` ${label.padEnd(14)}: ${String(value ?? "N/A")}`;

    return `│${content.padEnd(INNER)}│`;
}

export function renderHeader() {
    console.log(
        center(`┌${line()}┐`)
    );

    console.log(
        center(
            row("🌐", theme.framework)
        )
    );

    console.log(
        center(
            row("🟠", "Intelligent Messaging Framework")
        )
    );

    console.log(
        center(`├${line()}┤`)
    );
}

export function renderSystemInfo(info = {}) {
    console.log(
        center(
            row("🟢 STATUS", info.status)
        )
    );

    console.log(
        center(
            row("◉ UPTIME", info.uptime)
        )
    );

    console.log(
        center(
            row("🧠 MEMORY", info.memory)
        )
    );

    console.log(
        center(
            row("⚙️ COMMANDS", info.commands)
        )
    );

    console.log(
        center(
            row("🛠️ PLUGINS", info.plugins)
        )
    );

    console.log(
        center(
            row("⚡ EVENTS", info.events)
        )
    );

    console.log(
        center(
            row("🗄️ DATABASE", info.database)
        )
    );

    console.log(
        center(
            row("📱 WHATSAPP", info.whatsapp)
        )
    );
}

export function renderFooter(info = {}) {
    console.log(
        center(`├${line()}┤`)
    );

    console.log(
        center(
            row("👤 OWNER", info.owner)
        )
    );

    console.log(
        center(
            row("⚡ PREFIX", info.prefix)
        )
    );

    console.log(
        center(
            row("🏷️ VERSION", info.version)
        )
    );

    console.log(
        center(`└${line()}┘`)
    );
}

export function renderDashboard(info = {}) {
    console.clear();

    console.log("");

    renderHeader();

    console.log(
        center("◈ DARK VOID SYSTEM DASHBOARD")
    );

    console.log(
        center(`├${line()}┤`)
    );

    renderSystemInfo(info);

    renderFooter(info);

    console.log("");

    console.log(
        center("🚀 DARK VOID INITIALIZED")
    );

    console.log(
        center(
            `🟢 ENGINES ONLINE: ${info.onlineEngines ?? 0}/${info.totalEngines ?? 0}`
        )
    );

    if (info.allEnginesOnline === true) {
        console.log(
            center("⚡ SYSTEM READY")
        );
    } else {
        console.log(
            center("⚠️ SYSTEM NOT FULLY READY")
        );
    }

    console.log("");
}

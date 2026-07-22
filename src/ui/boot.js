import theme from "./theme.js";
import bootState from "./bootState.js";

export function bootScreen() {

    console.clear();

    console.log(`${theme.framework}`);
    console.log("Intelligent Messaging Framework");
    console.log("");
    console.log("🚀 VOID BOOT");
    console.log("");

    for (const engine of bootState) {

	const statusIcon = theme.status[engine.status] || "❓";

	const engineIcon = theme.icons[engine.id] || "❓";

	console.log(
	    `${engineIcon} ${engine.name.padEnd(25, ".")} ${statusIcon} ${engine.status}`
	);
    }

}

import bootState from "./bootState.js";
import { bootScreen } from "./boot.js";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function startBoot() {

    for (const engine of bootState) {

        engine.status = "starting";
        bootScreen();

        await sleep(500);

        engine.status = "online";
        bootScreen();

        await sleep(300);
    }

}

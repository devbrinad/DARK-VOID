import bootState from "../ui/bootState.js";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function startBoot(render) {
    for (const engine of bootState) {
        engine.status = "starting";
        render();

        await delay(350);

        engine.status = "online";
        render();

        await delay(150);
    }

    return bootState;
}

import makeWASocket, {
    useMultiFileAuthState
} from "@whiskeysockets/baileys";

import qrcode from "qrcode-terminal";
import logger from "../lib/logger.js";

export async function connectBot() {
    const { state, saveCreds } =
	await useMultiFileAuthState("./auth_info");
    const sock = makeWASocket({
	auth: state,
	printQRInterminal: false
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update",
({ connection, qr }) => {

	if (qr) {
	    logger.info("Scan the QR code below:");
	    qrcode.generate(qr, { small: true }):
	}

	if (connection === "open") {
	    logger.success("DARK VOID Connected!");
	}

	if (connection === "close") {
	    logger.warning("Connection Closed.");
	}

    });

    return sock;
}

import makeWASocket, {
    DisconnectReason,
    useMultiFileAuthState
} from "@whiskeysockets/baileys";

import qrcode from "qrcode-terminal";
import pino from "pino";
import path from "path";
import { fileURLToPath } from "url";

import BaseEngine from "./BaseEngine.js";
import STATUS from "../constants/status.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUTH_FOLDER = path.resolve(
    __dirname,
    "../../auth_info"
);

export default class WhatsAppEngine extends BaseEngine {
    constructor(onStatusChange = () => {}) {
        super("WhatsApp Engine");

        this.socket = null;
        this.reconnectTimer = null;
        this.reconnectDelay = 5000;
        this.stopping = false;
        this.connecting = false;

        this.onStatusChange = onStatusChange;

        this.logger = pino({
            level: "silent"
        });
    }

    updateStatus(status, error = null) {
        this.status = status;
        this.error = error;

        this.onStatusChange(status, error?.message || null);
    }

    async start() {
        if (
            this.status === STATUS.STARTING ||
            this.status === STATUS.ONLINE
        ) {
            return;
        }

        this.stopping = false;

        this.updateStatus(STATUS.STARTING);

        await this.connect();
    }

    async connect() {
        if (this.connecting || this.stopping) {
            return;
        }

        this.connecting = true;

        try {
            const { state, saveCreds } =
                await useMultiFileAuthState(AUTH_FOLDER);

            if (this.stopping) {
                this.connecting = false;
                return;
            }

            const socket = makeWASocket({
                auth: state,
                logger: this.logger,
                markOnlineOnConnect: false
            });

            this.socket = socket;

            socket.ev.on("creds.update", saveCreds);

            socket.ev.on(
                "connection.update",
                update => this.handleConnectionUpdate(
                    update,
                    socket
                )
            );

            socket.ev.on(
                "messages.upsert",
                ({ messages, type }) => {
                    if (type !== "notify") return;

                    for (const message of messages) {
                        if (
                            !message.message ||
                            message.key.fromMe
                        ) {
                            continue;
                        }

                        try {
                            const eventEngine =
                                this.engineManager?.get("event");

                            eventEngine?.emit(
                                "whatsapp.message",
                                message
                            );
                        } catch (error) {
                            this.logger.error(error);
                        }
                    }
                }
            );

            this.connecting = false;

        } catch (error) {
            this.connecting = false;

            if (!this.stopping) {
                this.updateStatus(
                    STATUS.FAILED,
                    error
                );

                console.error(
                    "WhatsApp initialization failed:",
                    error.message
                );
            }

            throw error;
        }
    }

    async handleConnectionUpdate(update, socket) {
        const { connection, lastDisconnect, qr } = update;

        if (socket !== this.socket || this.stopping) {
            return;
        }

        if (qr) {
            console.log("\n📱 SCAN THIS QR CODE WITH WHATSAPP\n");

            qrcode.generate(qr, {
                small: true
            });
        }

        if (connection === "connecting") {
            this.updateStatus(STATUS.STARTING);
        }

        if (connection === "open") {
            this.updateStatus(STATUS.ONLINE);

            console.log("\n🟢 WHATSAPP CONNECTED!");
            console.log("🌑 DARK VOID WhatsApp Engine ONLINE\n");
        }

        if (connection === "close") {
            const error = lastDisconnect?.error;

            const statusCode =
                error?.output?.statusCode;

            this.socket = null;

            this.updateStatus(
                STATUS.OFFLINE,
                error || null
            );

            console.log("\n🔴 WHATSAPP CONNECTION CLOSED");

            if (
                statusCode === DisconnectReason.loggedOut
            ) {
                console.log(
                    "⚠️ WhatsApp logged out. Manual re-authentication required."
                );

                return;
            }

            if (!this.stopping) {
                this.scheduleReconnect();
            }
        }
    }

    scheduleReconnect() {
        if (this.reconnectTimer || this.stopping) {
            return;
        }

        console.log(
            `🔄 Reconnecting WhatsApp in ${this.reconnectDelay / 1000} seconds...`
        );

        this.reconnectTimer = setTimeout(async () => {
            this.reconnectTimer = null;

            if (this.stopping) return;

            this.updateStatus(STATUS.STARTING);

            try {
                await this.connect();
            } catch (error) {
                console.error(
                    "WhatsApp reconnect failed:",
                    error.message
                );

                this.scheduleReconnect();
            }
        }, this.reconnectDelay);
    }

    async sendText(jid, text) {
        if (
            !this.socket ||
            this.status !== STATUS.ONLINE
        ) {
            throw new Error(
                "WhatsApp is not connected"
            );
        }

        if (
            typeof jid !== "string" ||
            !jid.trim()
        ) {
            throw new TypeError(
                "A valid WhatsApp JID is required"
            );
        }

        if (
            typeof text !== "string" ||
            !text.trim()
        ) {
            throw new TypeError(
                "Message text cannot be empty"
            );
        }

        return await this.socket.sendMessage(
            jid,
            { text }
        );
    }

    getSocket() {
        return this.socket;
    }

    async stop() {
        this.stopping = true;

        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTi

.exit

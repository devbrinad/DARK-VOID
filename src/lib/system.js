import os from "os";

export function getSystemInfo() {
    return {
        platform: os.platform(),
        architecture: os.arch(),
        hostname: os.hostname(),
        cpu: os.cpus()[0]?.model || "Unknown CPU",
        cores: os.cpus().length,
        memory: {
            total: formatBytes(os.totalmem()),
            free: formatBytes(os.freemem()),
            used: formatBytes(os.totalmem() - os.freemem())
        },
        uptime: formatUptime(os.uptime()),
        node: process.version
    };
}

function formatBytes(bytes) {
    const units = ["B", "KB", "MB", "GB", "TB"];

    let index = 0;
    let size = bytes;

    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }

    return `${size.toFixed(2)} ${units[index]}`;
}

function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    seconds %= 86400;

    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;

    const minutes = Math.floor(seconds / 60);

    return `${days}d ${hours}h ${minutes}m`;
}

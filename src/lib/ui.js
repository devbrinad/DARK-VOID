const WIDTH = 70;

export function center(text, width = WIDTH) {
    const padding = Math.max(0, Math.floor((width - text.length) / 2));

    return (
        " ".repeat(padding) +
        text +
        " ".repeat(width - text.length - padding)
    );
}

export function progressBar(current, total, width = 24) {
    const percentage = Math.floor((current / total) * 100);

    const filled = Math.floor((current / total) * width);

    const empty = width - filled;

    return (
        "█".repeat(filled) +
        "░".repeat(empty) +
        ` ${percentage}%`
    );
}

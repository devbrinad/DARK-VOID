import theme from "./theme.js";

const WIDTH = 60;

function centerText(text, width = WIDTH)
{
    const padding = Math.max(0, Math.floor((width - text.length) / 2));

    return (
	" ".repeat(padding) +
	text +
	" ".repeat(width - text.length - padding)
    );
}

export function bootScreen() {

console.clear();

console.log(`


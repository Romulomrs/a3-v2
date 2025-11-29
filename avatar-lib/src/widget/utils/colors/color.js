import colorPalette from "./color-palette.js"

const tones = [
    "_100","_200","_300","_400","_500",
    "_600","_700","_800","_900"
]

// Recebe o OBJETO key retornado por getKeyParams(seed)
function getColorIterator(key) {
    return function () {
        const idx = key.next256()  // Agora funciona
        return color(idx)
    }
}

function color(idx, tone = 5) {
    if (typeof idx === "number") {
        const ridx = idx % 18
        const keyName = Object.keys(colorPalette)[ridx]
        return colorPalette[keyName][tones[tone]]
    } else {
        // Quando receber string
        return colorPalette[idx][tones[tone]]
    }
}

export { getColorIterator, color }

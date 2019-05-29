export function RedToGreen(value, max) {
    let red = "#EB0101"
    let orange = "#FF5F00"
    let yellow = "#FFCE01"
    let green = "#4CF000"

    let result = value / max
    if (result < 0.18) {
        return red
    } else if (result < 0.45) {
        return orange
    } else if (result < 0.70) {
        return yellow
    } else {
        return green
    }
}

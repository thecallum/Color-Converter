const hex_to_hsl = hex => {
    let hexVal = hex.substring(1, hex.length);
    if (hexVal.length === 3) hexVal = hexVal.split('').map(item => item.repeat(2)).join('');

    let [r, g, b] = hexVal.match(/.{2}/g)

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return `hsl(${h},${s}%,${l}%)`;
}

// https://stackoverflow.com/questions/46432335/hex-to-hsl-convert-javascript

module.exports = hex_to_hsl;
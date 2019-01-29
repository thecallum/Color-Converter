const regex = require('../regex/regex');

const hsl_to_hex = hsl => {
    const result = regex.hsl.exec(hsl);
    let h = result[1] / 360;
    let s = result[5] / 100;
    let l = result[6] / 100;

    // https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex

    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    const hex = [r, g, b].map(item => Math.floor(item * 255).toString(16))

    return `#${hex.join('')}`;
}

module.exports = hsl_to_hex;
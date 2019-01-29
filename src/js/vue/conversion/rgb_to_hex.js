const regex = require('../regex/regex');

const rgb_to_hex = rgb => {
    const result = regex.rgb.exec(rgb);
    const r = result[1];
    const g = result[5];
    const b = result[9];

    const hexValues = [r, g, b].map(val => parseInt(val, 16));
    return `#${hexValues.join('')}`;
}

module.exports = rgb_to_hex;
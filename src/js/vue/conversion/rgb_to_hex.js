const regex = require('../regex/regex');

const rgb_to_hex = rgb => {
    const result = regex.rgb.exec(rgb);
    const r = result[1];
    const g = result[5];
    const b = result[9];

    const hexValues = [r, g, b].map(val => {
        const result = Number(val).toString(16);
        return result + '0'.repeat(2 - result.length);
    });
    return `#${hexValues.join('')}`;
}

module.exports = rgb_to_hex;
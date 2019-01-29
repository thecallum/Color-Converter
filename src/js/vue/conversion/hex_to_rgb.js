const hex_to_rgb = hex => {
    let values = hex.substring(1, hex.length).split('');

    if (values.length === 3) values = values.map(item => parseInt(item + 'f', 16));
    else values = values.map((item, index) => index % 2 === 0 ? parseInt(item + values[index + 1], 16) : null).filter(item => item !== null)

    return `rgb(${values[0]},${values[1]},${values[2]})`;
}

module.exports = hex_to_rgb;
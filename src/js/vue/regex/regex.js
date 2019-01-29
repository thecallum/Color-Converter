const regex = {
    hex: /^#([0-9a-f]{3})([0-9a-f]{3})?$/,
    rgb: /^rgb\((([0-1]?[0-9]?[0-9])|([2][0-4][0-9])|(25[0-5])),(([0-1]?[0-9]?[0-9])|([2][0-4][0-9])|(25[0-5])),(([0-1]?[0-9]?[0-9])|([2][0-4][0-9])|(25[0-5]))\)$/,
    hsl: /^hsl\((([0-2]?[0-9]?[0-9])|(3[0-5][0-9])|(360)),(100|[0-9]?[0-9])%,(100|[0-9]?[0-9])%\)$/,
}

module.exports = regex;
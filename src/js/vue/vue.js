const rgb_to_hex = require('./conversion/rgb_to_hex');
const hsl_to_hex = require('./conversion/hsl_to_hex');
const hex_to_rgb = require('./conversion/hex_to_rgb');
const hex_to_hsl = require('./conversion/hex_to_hsl');

const regex = require('./regex/regex');


module.exports = new Vue({
    el: '#app',
    data: {
        input_hex: '',
        input_rgb: '',
        input_hsl: '',
        input_cmyk: '',

        backgroundColor: '#fff',
        oppositeColor: '#000',
        backgroundIsDark: false,

        updating: false,
    },

    mounted() {
        this.randomColor();
    },
    watch: {
        input_hex(val) {
            if (regex.hex.test(val) && !this.updating) {
                this.updating = true;
                this.updateBackgroundColor(val, 'hex');
            }
        },
        input_rgb(val) {
            if (regex.rgb.test(val) && !this.updating) {
                this.updating = true;
                const hex = rgb_to_hex(val);
                this.updateBackgroundColor(hex, 'rgb');
            }
        },
        input_hsl(val) {
            if (regex.hsl.test(val) && !this.updating) {
                this.updating = true;
                const hex = hsl_to_hex(val);
                this.updateBackgroundColor(hex, 'hsl');
            }
        }
    },

    methods: {
        hexIsDark(hex) {
            const arr = hex.substring(1, hex.length).match(/.{2}/g).map(item => parseInt(item, 16)).filter(val => val >= 128);
            return !arr.length;
        },
        randomColor() {
            const newHex = this.randomHexColor();
            const oppositeHex = this.oppositeHexColor(newHex)

            this.updateBackgroundColor(newHex)
            this.updateOppositeColor(oppositeHex)

            this.backgroundIsDark = this.hexIsDark(newHex);

        },
        updateBackgroundColor: function (hex, origin) {
            this.backgroundColor = hex;

            if (origin !== 'hex') this.input_hex = hex;
            if (origin !== 'rgb') this.input_rgb = hex_to_rgb(hex);
            if (origin !== 'hsl') this.input_hsl = hex_to_hsl(hex);

            setTimeout(() => {
                this.updating = false;
            }, 10);
        },
        updateOppositeColor(hex) {
            this.oppositeColor = hex;
        },
        randomHexColor() {
            const color = Array.apply(null, { length: 3 }).map(() => {
                const hex = Math.floor(Math.random() * 255).toString(16);
                return hex + '0'.repeat(2 - hex.length);
            }).join('');

            return `#${color}`;
        },

        oppositeHexColor(hex) {
            return hex.split('').map(item => item === '#' ? item : (15 - parseInt(item, 16)).toString(16)).join('');
        }
    }
})

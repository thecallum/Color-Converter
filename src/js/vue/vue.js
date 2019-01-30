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

        input_hex_error: false,
        input_rgb_error: false,
        input_hsl_error: false,

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
            if (this.updating) return;

            if (regex.hex.test(val)) this.updateColors('hex', val);
            else this.input_hex_error = true;
        },
        input_rgb(val) {
            if (this.updating) return;

            if (regex.rgb.test(val)) this.updateColors('rgb', rgb_to_hex(val));
            else this.input_rgb_error = true;
        },
        input_hsl(val) {
            if (this.updating) return;

            if (regex.hsl.test(val)) this.updateColors('hsl', hsl_to_hex(val));
            else this.input_hsl_error = true;
        }
    },

    methods: {
        updateColors(origin, hex) {
            this.updating = true;

            this.updateBackgroundColor(hex);
            this.updateOppositeColor(hex);
            this.updateInputs(hex, origin)
        },
        hexIsDark(hex) {
            const arr = hex.substring(1, hex.length).match(/.{2}/g).map(item => parseInt(item, 16)).filter(val => val <= 100);
            // is dark if there are no 'light' values (above 100)
            return !!arr.length;
        },
        randomColor() {
            this.updateColors(null, this.randomHexColor())
        },
        updateBackgroundColor(hex) {
            this.backgroundColor = hex;
            this.backgroundIsDark = this.hexIsDark(hex);
        },
        updateInputs(hex, origin) {
            if (origin !== 'hex') this.input_hex = hex;
            if (origin !== 'rgb') this.input_rgb = hex_to_rgb(hex);
            if (origin !== 'hsl') this.input_hsl = hex_to_hsl(hex);

            this.clearErrors();

            setTimeout(() => { this.updating = false; }, 10);
        },
        clearErrors() {
            this.input_hex_error = false;
            this.input_rgb_error = false;
            this.input_hsl_error = false;
        },
        updateOppositeColor(hex) {
            this.oppositeColor = hex.split('').map(item => item === '#' ? item : (15 - parseInt(item, 16)).toString(16)).join('');
        },
        randomHexColor() {
            const color = Array.apply(null, { length: 3 }).map(() => {
                const hex = Math.floor(Math.random() * 255).toString(16);
                return hex + 'f'.repeat(2 - hex.length);
            }).join('');

            return `#${color}`;
        }
    }
})

const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src', 'js', 'app.js'),
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Vue: 'vue'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public')
    }
};
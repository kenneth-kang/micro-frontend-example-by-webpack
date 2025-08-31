const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/dev.js', // 개발용 진입점
    devServer: {
        static: './dist',
        port: 3001,
    },
    plugins: [
        new Dotenv({
            path: './.env.development',
        }),
    ],
});

const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'auto',
    },
    resolve: {
        extensions: ['.jsx', '.js', '.tsx', '.ts', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-typescript'],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'designSystem',
            filename: 'remoteEntry.js',
            exposes: {
                './Button': './src/components/Button.tsx',
                './Card': './src/components/Card.tsx',
                './styles': './src/styles/tailwind.css',
                './colorStore': './src/store/colorStore.ts',
            },
            shared: {
                react: { singleton: true, requiredVersion: '18.2.0', eager: true },
                'react-dom': { singleton: true, requiredVersion: '18.2.0', eager: true },
                zustand: { singleton: true, eager: true, requiredVersion: '4.5.2' },
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
};

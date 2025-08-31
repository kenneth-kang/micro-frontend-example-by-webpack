const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    return {
        entry: './src/index.js',
        mode: argv.mode,
        devServer: {
            static: path.join(__dirname, 'dist'),
            port: 3100,
        },
        output: {
            publicPath: 'auto',
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
            ],
        },
        plugins: [
            new Dotenv({
                path: isDevelopment ? './.env.development' : './.env.production',
            }),
            new ModuleFederationPlugin({
                name: 'template',
                remotes: {
                    designSystem: isDevelopment ? 'designSystem@http://localhost:3001/remoteEntry.js' : 'design-system',
                },
                shared: {
                    react: { singleton: true, requiredVersion: '18.2.0', eager: true },
                    'react-dom': { singleton: true, requiredVersion: '18.2.0', eager: true },
                },
            }),
            new HtmlWebpackPlugin({
                template: './public/index.html',
            }),
        ],
    };
};

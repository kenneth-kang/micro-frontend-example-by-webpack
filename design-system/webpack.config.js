const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    return {
        entry: {
            // 개발 서버용 진입점 (마이크로 프론트엔드 자체 뷰)
            main: isDevelopment ? './src/dev.js' : './src/index.ts',
            // npm 패키지용 진입점 (별도로 번들링)
            lib: './src/index.ts',
        },
        mode: argv.mode,
        output: {
            filename: (pathData) => {
                // main과 lib 번들 파일명 분리
                return pathData.chunk.name === 'main' ? 'main.js' : 'lib.js';
            },
            path: path.resolve(__dirname, 'dist'),
            publicPath: 'auto',
            libraryTarget: 'umd', // npm 패키지용 포맷
        },
        resolve: {
            extensions: ['.jsx', '.js', '.tsx', '.ts', '.css'],
        },
        devServer: isDevelopment
            ? {
                  static: path.join(__dirname, 'dist'),
                  port: 3001,
              }
            : undefined,
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
            new Dotenv({
                path: isDevelopment ? './.env.development' : './.env.production',
            }),
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
};

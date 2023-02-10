const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            include: path.join(__dirname, 'src')
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            options: { presets: ['@babel/env', '@babel/preset-react'] },
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.svg/,
            type: 'asset/inline'
        },
        {
            test: /\.(png|jpeg)$/,
            type: 'asset/resource'
        }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './src/public/index.html',
            minify: {
                removeComments: true
            }
        }),
        new webpack.DefinePlugin({
            environment: JSON.stringify({
                API: 'your_prod_api'
            })
        }),
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};

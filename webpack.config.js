const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'src', 'main.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: './',
        filename: 'app.js',
        chunkFilename: '[name].js'
    },
    module: {
        rules: [{
            test: /.tsx?$/,
            include: [
                path.resolve(__dirname, 'src')
            ],
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ],
            loader: 'ts-loader'
            // query: {
            //     presets: [
            //         ['@babel/env', {
            //             'targets': {
            //                 'browsers': 'last 2 chrome versions'
            //             }
            //         }]
            //     ]
            // }
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            file: './index.html',
            inject: true,
            hash: true,
            minify: true
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css'
        }),
        new CopyWebpackPlugin([
            // {output}/file.txt
            {
                from: 'src/asset',
                to: 'asset'
            }])
    ],
    resolve: {
        extensions: ['.json', '.js', '.jsx','.ts','.tsx'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, '/dist/'),
        inline: true,
        host: 'localhost',
        port: 8080,
    },
    externals: {
        vue: 'Vue'
    }
};

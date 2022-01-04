const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outputPath = path.resolve(__dirname, 'dist');

// set mode
const mode = process.env.NODE_ENV
    ? process.env.NODE_ENV
    : 'production';

module.exports = {
    mode: mode,
    entry: {
        app: require.resolve('./src/entrypoint'),
    },
    context: path.resolve('./'),
    resolve: {
        extensions: ['.js', '.jsx'],
        roots: [
            path.resolve('./src'),
        ],
    },
    devtool: mode === "development"
        ? 'cheap-module-source-map'
        : false,
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve(__dirname, ".")
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        node: true,
                                    },
                                },
                            ],
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-syntax-import-meta',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-proposal-private-methods',
                            '@babel/plugin-proposal-nullish-coalescing-operator',
                            '@babel/plugin-proposal-function-bind',
                            '@babel/plugin-proposal-optional-chaining',
                            '@babel/plugin-proposal-json-strings',
                        ]
                    }
                },
            },
            {
                test: /\.yaml$/,
                use: [
                    { loader: 'json-loader' },
                    { loader: 'yaml-loader' }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin([
            outputPath
        ]),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: require.resolve('swagger-ui/dist/oauth2-redirect.html'),
                    to: './'
                },
                {
                    // sample configuration
                    from: './config.json',
                    to: './'
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: "assets/index.html",
            publicPath: "/"
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: outputPath,
    }
};

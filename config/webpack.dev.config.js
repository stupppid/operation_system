const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin')

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, '../'),
    entry: { index: './src/index.js'},
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].js",
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            [
                                "@babel/plugin-proposal-decorators",
                                {
                                    "legacy": true
                                }
                            ],
                            [
                                "@babel/plugin-proposal-class-properties"
                            ],
                            ["@babel/plugin-transform-runtime",
                                {
                                    "regenerator": true
                                }
                            ]
                        ],
                    }
                }
            },
            {
                test: /\.s?css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: [/\.template\.xhtml$/, /\.rtjs$/],
                use: 'raw-loader'
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        // new TypedocWebpackPlugin({
        //     name: 'Contoso',
        //     mode: 'file',
        //     theme: './typedoc-theme/',
        //     includeDeclarations: false,
        //     ignoreCompilerErrors: true,
        // })
    ],
    devServer: {
        port: 9001
    },
    devtool: "cheap-module-eval-source-map",
}

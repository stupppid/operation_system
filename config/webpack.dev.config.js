const path = require('path')
const TypedocWebpackPlugin = require('typedoc-webpack-plugin')

module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, '../'),
    entry: { index: './src/index.ts'},
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
                use: [

                    {
                        loader: 'babel-loader',
                    },{
                        loader: 'ts-loader'
                    }
                ]
            },
        ]
    },
    plugins: [],
    devServer: {
        port: 9000
    },
    devtool: "cheap-module-eval-source-map",
}

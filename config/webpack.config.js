const path = require('path')
const TypedocWebpackPlugin = require('typedoc-webpack-plugin')
module.exports = {
    mode: 'production',
    context: path.resolve(__dirname, '../'),
    entry: { ratta: './src/index.ts'},
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].min.js",
        library: '[name]',
        libraryTarget: 'umd',
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
                        loader: 'ts-loader'
                    }
                ]
            },
        ]
    },
    plugins: [
        // new TypedocWebpackPlugin({
        //     name: 'Contoso',
        //     mode: 'file',
        //     theme: './typedoc-theme/',
        //     includeDeclarations: false,
        //     ignoreCompilerErrors: true,
        // })
    ],
}

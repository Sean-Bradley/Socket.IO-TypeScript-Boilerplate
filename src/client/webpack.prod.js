const path = require('path')

module.exports = {
    mode: 'production',
    performance: {
        hints: false,
    },
    entry: './src/client/client.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    },
}

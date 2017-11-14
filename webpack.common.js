const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const distFolder = 'dist';

module.exports = {
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin([distFolder])
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader?presets[]=es2015'
            }
        ],
    },
    output: {
        filename: 'OrbitControl.js',
        path: path.resolve(__dirname, distFolder),
        library: 'OrbitControl',
        libraryTarget: 'var'
    }
};

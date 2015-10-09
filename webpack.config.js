var webpack = require('webpack');
var name = require('./package.json').name;
var description = require('./package.json').description;
var version = require('./package.json').version;

module.exports = {
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,

    entry: {
        main: [
            __dirname + '/node_modules/babel-core/browser-polyfill.js',
            './app/App.js'
        ]
    },

    output: {
        path: '__build__',
        publicPath: '__build__',
        filename: 'build.js'
    },

    module: {
        noParse: [
            /\/babel-core\/browser-polyfill\.js$/
        ],
        preLoaders: [{
            test: /\.jsx?$/,
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules[\/\\]/,
            loader: 'babel-loader?stage=0'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(eot|woff2|ttf|svg|woff)$/,
            loader: 'url-loader'
        }]
    },

    plugins: [
        new webpack.DefinePlugin({
            process: {
                env: {
                    NODE_ENV: '"' + process.env.NODE_ENV + '"'
                },
                appData: {
                    name: '"' + name + '"',
                    description: '"' + description + '"',
                    version: '"' + version + '"'
                }
            }
        }),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        })
    ],

    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};

const { resolve } = require('path')
const { merge } = require('webpack-merge')
const commonConfig = require('./common')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(commonConfig, {
    mode: "development",
    devtool: "source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve('./', 'public/index.html'),
            collapseWhitespace: true,
            removeComments: true,
            inject: 'body'
        }),
    ],
    devServer: {
        compress: true,
        port: 8001,
        open: true
    }
})
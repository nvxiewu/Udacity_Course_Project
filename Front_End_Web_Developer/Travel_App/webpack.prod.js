const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')


module.exports = {
    mode:'production',
    entry: './src/client/index.js',
    optimization:{
        minimizer:[
            new TerserPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module:{
        rules:[
            {
                test:'/\.js$/',
                exclude:/node_modules/,
                loader:"babel-loader"
            },
            {
                test:/\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,'css-loader','sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:"./src/client/views/index.html",
            filename:"./index.html",
        }),
        new CleanWebpackPlugin({
            dry:true,
            verbose:true,
            cleanStaleWebpackAssets:true,
            protectWebpackAssets:false
        }),
        new MiniCssExtractPlugin({filename:'[name].css'})
    ]
}
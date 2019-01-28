/**
 * production
 * webpack生成环境config配置
 */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 以link标签形式引入css文件，替代style-loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// webpack配置文件公用优化
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    mode: 'production',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader?modules', "postcss-loader"] // ?modules - 开启模块化的另一种方式
            },
            {
                test: /\.less$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: [
                    MiniCssExtractPlugin.loader, // 使用link方式引入css。style-loader是使用style标签引入。
                    {
                        loader: "css-loader",
                        options:{
                            modules: true,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "postcss-loader", // 添加浏览器兼容前缀
                        options: {
                            ident: 'prostcss',
                            sourceMap: true,
                            plugins: [
                                require("autoprefixer")({browsers: ['>0.15% in CN']})
                            ]
                        }
                    },
                    {
                        loader: "less-loader",
                        options:{
                            // 开启模块化，否则import XX from './xx.less'会不生效
                            modules: true,
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },

    /* 插件 */
    plugins: [
        new MiniCssExtractPlugin({
          filename: '[name].[hash].css', // 设置最终输出的文件名
          chunkFilename: '[id].[hash].css'
        })
    ],

    optimization: {
        minimizer: [
            new OptimizeCSSAssetsPlugin({}), // 压缩css
            new UglifyJsPlugin({             // 压缩js
                cache: true,
                parallel: true,
                sourceMap: false // 是否需要sourcemaps
            })
        ]
    },
});
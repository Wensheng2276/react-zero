/**
 * common
 * webpack公共config配置
 */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理dist目录。清除hash带来多文件。
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {

    /* 入口 */
    entry: [
        'babel-polyfill', path.join(__dirname, 'src/index.js')
    ],

    /* 输出到dist文件夹，输出文件名字为bundle.js */
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.[hash].js'
    },

    /* src文件夹下面的以.js结尾的文件，要使用babel解析 */
    /* cacheDirectory是用来缓存编译结果，下次编译加速 */
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader?cacheDirectory=true'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]
    },

    /* 插件 */
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, './src/public'),
                to: path.join(__dirname, './dist')
            }
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html', // 默认值： 'index.html'
            template: path.resolve(__dirname, 'src/index.html'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,       // 移出注释
                removeAttributeQuotes: true // 移除属性的引号
            }
        }),
        new CleanWebpackPlugin(['dist'])
    ],

    /* 路径优化 */
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            public: path.join(__dirname, 'src/public'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),

        }
    }
};

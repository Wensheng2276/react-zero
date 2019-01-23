const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 以link标签形式引入css文件，替代style-loader
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css代码
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 压缩js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清理dist目录。清除hash带来多文件。
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
     mode: 'production',

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
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?modules', "postcss-loader"] // ?modules - 开启模块化的另一种方式
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
            },

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
        new MiniCssExtractPlugin({
          filename: '[name].[hash].css', // 设置最终输出的文件名
          chunkFilename: '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            title: 'AICODER 全栈线下实习', // 默认值：Webpack App
            filename: 'main.html', // 默认值： 'index.html'
            template: path.resolve(__dirname, 'src/index.html'),
            minify: {
                collapseWhitespace: true,
                removeComments: true,       // 移出注释
                removeAttributeQuotes: true // 移除属性的引号
            }
        }),
        new CleanWebpackPlugin(['dist'])
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

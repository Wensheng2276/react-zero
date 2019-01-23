const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
     mode: 'production',

    /* 入口 */
    entry: [
        'babel-polyfill', path.join(__dirname, 'src/index.js')
    ],

    /* 输出到dist文件夹，输出文件名字为bundle.js */
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
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
                use: ['style-loader', 'css-loader?modules', "postcss-loader"] // 开启模块化的另一种方式
            },
            {
                test: /\.less$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: [
                    "style-loader",
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

    /* web服务 */
    devServer: {
        // contentBase: URL的根目录。如果不设定的话，默认指向项目根目录。
        contentBase: path.join(__dirname, './dist'),

        // 任意的404响应都被替代为index.html。用来解决页面刷新找不到react设置的路由问题。
        historyApiFallback: true,

        // 启动服务端口，默认8080
        // port: 8080,

        // 启动热加载
        // hot: true,

        // 代理配置
        proxy: {
          "/api": "http://localhost:3000"
        },
    },

    /* 插件 */
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, './src/public'),
                to: path.join(__dirname, './dist')
            }
        ])
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

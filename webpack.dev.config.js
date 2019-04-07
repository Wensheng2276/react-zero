/**
 * development
 * webpack开发环境config配置
 */

const path = require('path');

// webpack配置文件公用优化
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    mode: 'development',

    /* 开启js的source-map */
    devtool: 'inline-source-map',

    /* web服务 */
    devServer: {
        // contentBase: URL的根目录。如果不设定的话，默认指向项目根目录。
        contentBase: path.join(__dirname, './dist'),

        // 任意的404响应都被替代为index.html。用来解决页面刷新找不到react设置的路由问题。
        historyApiFallback: true,

        // 启动服务端口，默认8080
        // port: 8080,

        // 打开浏览器
        open: true,

        // 代理配置
        proxy: {
          "/api": "http://localhost:3000"
        },

        //监视文件相关的控制选项
        watchOptions: {
            ignored: /node_modules/
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options:{
                            modules: true,
                        }
                    },
                    "postcss-loader"
                ] // ?modules - 开启模块化的另一种方式
            },
            {
                test: /\.less$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: [
                    'style-loader',
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
                                require("autoprefixer")({browsers: "last 5 version"})
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
    }

});

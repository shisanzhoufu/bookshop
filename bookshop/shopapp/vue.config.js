module.exports = {
    devServer: {
        // open: true,
        host: "localhost",
        port: 8080,
        // https: false,
        // hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000', //API服务器的地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    }
}
// Configuring the Proxy Manually

const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5000', // Node 서버 포트를 맞춰줌
            changeOrigin: true,
        })
    );
};
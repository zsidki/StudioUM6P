const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    'https://comm6-0-1.onrender.com/api', // Forward all API requests starting with https://comm6-0-1.onrender.com/api
    createProxyMiddleware({
      target: 'https://comm6-0-1.onrender.com',
      changeOrigin: true,
    })
  );
};

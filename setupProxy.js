const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/lol',
    createProxyMiddleware({
      target: 'https://americas.api.riotgames.com',
      changeOrigin: true,
      pathRewrite: {
        '^/lol': '/lol'
      }
    })
  );
};
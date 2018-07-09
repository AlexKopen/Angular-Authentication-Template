module.exports = {
  '/api': {
    target: 'http://localhost:3001/api',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    },
    secure: false
  }
};

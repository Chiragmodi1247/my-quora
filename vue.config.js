module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '^/backend': {
        target: 'http://172.16.20.165:8111/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {'^/backend' : ''}
      },
      '^/report': {
        target: 'http://172.16.20.161:8090/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {'^/report' : ''}
      },
    }
  },
  lintOnSave: true
}
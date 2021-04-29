module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      // 共享全局样式变量
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      // 把 /boss代理到: http://eduboss.lagou.com
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true
      },
      // 把 /front 代理到: http://edufront.lagou.com
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true
      }
    }
  }
}

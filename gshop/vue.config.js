module.exports = {
	// 基本路径
	publicPath: '/',
	// 构建时输出目录
	outputDir: 'dist',
	// 放置静态资源的目录
	assetsDir: 'static',
	// Html输出路径
	indexPath: 'index.html',
	// 文件名哈希
	filenameHashing: true,
	// eslint是否在保存时检查代码
	lintOnSave: true,
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:4000',
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					'^/api':''
				}
			}
		}
	}
}
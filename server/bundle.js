var Webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    WebpackConfig = require('./../webpack.config.js'),
    path = require('path'),
    fs = require('fs'),
    mainParth = path.resolve(__dirname, '..', 'app', 'main.js');

module.exports = function () {

    var bundleStart = null;
    var compiler = Webpack(WebpackConfig);

    compiler.plugin('compile', function () {
       console.log('Bundling...');
        bundleStart = Date.now();
    });

    compiler.plugin('done', function () {
       console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms');
    });

    var bundler = new WebpackDevServer(compiler, {
        publicPath: '/build/',
        hot: true,
        quiet: false,
        noInfo: true,
        stats: {
            colors: true
        }
    });

    bundler.listen(8080, 'localhost', function () {
       console.log('Bundling project, please wait...');
    });

};

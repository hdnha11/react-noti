const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

const webpack = require('webpack');
const path = require('path'),
  join = path.join,
  resolve = path.resolve;

const getConfig = require('hjs-webpack');

const root = resolve(__dirname);
const src = join(root, 'src');
const modules = join(root, 'node_modules');
const dest = join(root, 'dist');

var config = getConfig({
  isDev: isDev,
  in: join(src, 'app.js'),
  out: dest,
  clearBeforeBuild: true,
  devServer: {
    port: 3333
  }
});

config.module.preLoaders = [{
  test: /(\.js$|\.jsx$)/,
  exclude: [/node_modules/, /libs/],
  loader: 'eslint-loader'
}];
config.eslint = {
  configFile: '.eslintrc'
};

config.module.loaders.push({
  test: /\.css$/,
  loader: 'resolve-url'
});
config.module.loaders.push({
  test: /\.scss$/,
  loader: 'resolve-url'
});

config.resolve.root = [src, modules];
config.resolve.alias = {
  'css': join(src, 'styles'),
  'containers': join(src, 'containers'),
  'components': join(src, 'components'),
  'utils': join(src, 'utils'),
  'libs': join(src, 'libs')
};

config.plugins.push(new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
}));

module.exports = config;

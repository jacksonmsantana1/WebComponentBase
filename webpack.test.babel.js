export default {
  entry: './test/app.spec.js',
  output: {
    path: './test',
    filename: 'spec.js',
    publicPath: '/test/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};

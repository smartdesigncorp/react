//Dependencias
import webpack from 'webpack';
import path from 'path';

//Path
const PATH = {
  index: path.join(__dirname,'src/index'),
  build: path.join(__dirname,'/dist'),
  src: path.join(__dirname,'src')
};

//Configuaracion de webpack
export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    PATH.index
  ],
  output: {
    path: PATH.build,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [{
      test:/\.js?$/,
      loaders: ['babel-loader'],
      include: PATH.src
    },
    {
      test: /(\.css)$/,
      loaders: ['style-loader','css-loader']
    },
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader:'url-loader?limit=10000&mimetype=image/svg+xml'
    }]
  }
};

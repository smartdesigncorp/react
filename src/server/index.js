//Dependencias
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';

//Configuracion de webpack
import webpackConfig from '../../webpack.config.dev';

//Puerto del servidor
const port = 3000;

//Express App
const app = express();

//Webpack Compiler
const webpackCompiler = webpack(webpackConfig);

//Webpack middlewares
app.use(webpackDevMiddleware(webpackCompiler));
app.use(webpackHotMiddleware(webpackCompiler));

//Se envia toso el trafico de React
app.get('*',(req,res) =>{
  res.sendFile(path.join(__dirname,'../public/index.html'));
});

//Puerto que escucha
app.listen(port,err => {
  if(!err){
    open('http://localhost:'+port);
  }
});

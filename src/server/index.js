//Dependencias
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';

//Configuracion de webpack
import webpackConfig from '../../webpack.config.babel';

//Puerto del servidor
const port = 3000;

//Environment
const isDevelopment = process.env.NODE_ENV !== 'produccion';

//Express App
const app = express();

//Public
app.use(express.static(path.join(__dirname,'../public')));

//Webpack Compiler
const webpackCompiler = webpack(webpackConfig);

//Webpack middlewares
if(isDevelopment){
  app.use(webpackDevMiddleware(webpackCompiler));
  app.use(webpackHotMiddleware(webpackCompiler));
}

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

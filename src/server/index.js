//Dependencias
import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import open from 'open';
import exphbs from 'express-handlebars';

//Configuracion de webpack
import webpackConfig from '../../webpack.config.babel';

// API
import blogApi from './api/blog';

//Helpers
import * as hbsHelper from '../lib/handlebars';

//Utils
import {isMobile} from '../lib/utils/device';

//Puerto del servidor
const port = 3000;

//Environment
const isDevelopment = process.env.NODE_ENV !== 'produccion';

//Express App
const app = express();

//Public
app.use(express.static(path.join(__dirname,'../public')));

//handlebars setup
app.engine('.hbs',exphbs({
  extname:'.hbs',
  helpers:hbsHelper
}));

//View Engine Setup
app.set('views',path.join(__dirname,'./views'));
app.set('view engine', '.hbs');

//Webpack Compiler
const webpackCompiler = webpack(webpackConfig);

//Webpack middlewares
if(isDevelopment){
  app.use(webpackDevMiddleware(webpackCompiler));
  app.use(webpackHotMiddleware(webpackCompiler));
}

//Device detector
app.use((req,res,next) => {
  res.locals.isMobile = isMobile(req.headers['user-agent']);
  return next();
})

// API dispatch
app.use('/api/blog', blogApi);

//Se envia toso el trafico de React
app.get('*',(req,res) =>{
  res.render('frontend/index',{
    layout:false
  });
});

//Puerto que escucha
app.listen(port,err => {
  if(!err){
    open('http://localhost:'+port);
  }
});

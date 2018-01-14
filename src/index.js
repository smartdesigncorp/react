//Dependencias
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

//Rutas
import AppRoutes from './routes';

//Asset
import './index.css';

render(
  <Router>
    <AppRoutes />
  </Router>,
  document.getElementById('root')
);

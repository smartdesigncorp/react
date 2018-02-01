//Dependecias
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

//Assets
import logo from './images/logo.svg';
import './css/header.css';

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };

  render() {
    const {title, items} = this.props;
    return (
      <div className="header">
        <header className="logo">
          <img src={logo} alt="logo" />
          <h2>{title}</h2>
          <ul className="Menu">
            {
              items && items.map(
                (items,key) => <li key={key}><Link to={items.url}>{items.title}</Link></li>
              )
            }
          </ul>
        </header>
      </div>
    );
  }
}

export default Header;

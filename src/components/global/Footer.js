//Dependecias
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Assets
import './css/footer.css';

class Footer extends Component {
  static propTypes = {
    copyright: PropTypes.string
  };
  render() {
    const {copyright = "&copy; Hello world 2018"} = this.props;
    return (
      <div className="footer">
        <p dangerouslySetInnerHTML={{__html:copyright}} />
      </div>
    );
  }
}

export default Footer;

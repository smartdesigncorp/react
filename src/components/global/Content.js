//Dependencias
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Asset
import './css/content.css';

class Content extends Component {
  static propTypes = {
    body: PropTypes.object.isRequired
  };

  render() {
    const {body} = this.props;
    return (
      <div className="content">
        {body}
      </div>
    );
  }
}

export default Content;

import React from 'react';
import PropTypes from 'prop-types';
import '../../css/error.css';

class ErrorTag extends React.Component {
  render() {
    return (
      <div className='error' style={this.props.style} id={this.props.index}>
        <button className='error-close-button' onClick={this.props.onClose}>
          <span className='close-error'>&times;</span>
        </button>
        {this.props.children}
      </div>
    );
  }
}

ErrorTag.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default ErrorTag;

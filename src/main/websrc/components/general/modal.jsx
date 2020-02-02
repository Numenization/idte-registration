import React from 'react';
import PropTypes from 'prop-types';
import '../../css/modal.css';

class Modal extends React.Component {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className='backdrop'>
        <div className='modal' style={this.props.style}>
          <button className='modal-close-button' onClick={this.props.onClose}>
            <span className='close-modal'>&times;</span>
          </button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;

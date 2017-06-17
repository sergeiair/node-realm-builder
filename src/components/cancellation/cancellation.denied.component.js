import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CancellationDenied extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <div className="container">
        <h2 className="my-3 c-error-red font-weight-normal">
          Can not load your booking data.
        </h2>
        <div className="mt-5">
          <button onClick={this.context.reload} className="core-btn bg-rooms-blue c-light-base">
            Try again
          </button>
        </div>
      </div>
    );
  }
}

CancellationDenied.contextTypes = {
  reload: PropTypes.func,
};

export default CancellationDenied;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CancellationFailed extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <div className="container">
        <h2 className="my-3 c-error-red font-weight-normal">
          Your booking number: {this.context.urlParams.rid} has not been cancelled. Please try again
        </h2>
        <div className="mt-5">
          <button onClick={this.context.cancelRequest} className="core-btn-primary">
            Cancel my booking
          </button>
        </div>
      </div>
    );
  }
}

CancellationFailed.contextTypes = {
  urlParams: PropTypes.object,
  cancelRequest: PropTypes.func,
};

export default CancellationFailed;

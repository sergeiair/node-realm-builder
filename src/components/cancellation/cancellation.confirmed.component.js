import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CancellationConfirmed extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <div className="container">
        <h2 className="c-dark-blue font-weight-normal">
          Booking no. {this.context.urlParams.rid} has been successfully cancelled
        </h2>
        <small className="d-block mt-5 c-text-grey">
          What would you like to do next?
        </small>
        <div className="row mt-4">
          <div className="col-sm-12 col-lg-4 mt-2">
            <a href="https://rooms.ryanair.com" className="d-block w-100 core-btn-primary">
              Book another hotel
            </a>
          </div>
          <div className="col-sm-12 col-lg-4 mt-2">
            <a href="https://ryanair.com" className="d-block w-100 core-btn-primary">
              Book a flight
            </a>
          </div>
          <div className="col-sm-12 col-lg-4 mt-2">
            <a href="https://car-hire.ryanair.com" className="d-block w-100 core-btn-primary">
              Rent a car
            </a>
          </div>
        </div>
      </div>
    );
  }
}

CancellationConfirmed.contextTypes = {
  urlParams: PropTypes.object,
};

export default CancellationConfirmed;

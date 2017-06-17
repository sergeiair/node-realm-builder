import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Subhead from './../common/subhead.component';
import Section from './../common/section.component';
import SectionRow from './../common/sectionRow.component';
import ImagesBar from './../common/imagesBar.component';

class CancellationPending extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  get emptyCancellationData() {
    return {
      hotel: {},
      receiver: {},
      totalPrice: {},
    };
  }

  get cancellationData() {
    const { data } = this.props;
    return data.reservation ? data.reservation.reservation : this.emptyCancellationData;
  }

  get checkInDate() {
    return new Date((this.cancellationData.dateFrom || '').split('+')[0]);
  }

  get shortNormalizedCheckInDate() {
    return this.checkInDate
      .toLocaleString("en-us", { month: 'long', day: 'numeric'});
  }

  get normalizedCheckInDate() {
    return this.checkInDate
      .toLocaleString("en-us", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  get normalizedCheckOutDate() {
    return new Date((this.cancellationData.dateTo || '').split('+')[0])
      .toLocaleString("en-us", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  render() {
    return (
      <div>
        <Subhead title={`Cancel reservation ${this.cancellationData.number}`}
          text={`Dear ${this.cancellationData.receiver.firstName} ${this.cancellationData.receiver.lastName},
            you are about to cancel your reservation at the ${this.cancellationData.hotel.name}.
            Please review the following details and confirm the cancellation with the button below.`}/>
        <Section title={`Reservation details`}>
          <ImagesBar images={[this.cancellationData.hotel.mapUrl, this.cancellationData.hotel.mainImageUrl]}/>
          <div className="py-4">
            <SectionRow title="Hotel name">
              <small className="font-weight-bold">{this.cancellationData.hotel.name}</small>
              <img className="mt-1 d-block"
                   src={`http://fr-ota-cloudformation-test-bucket.s3-website-eu-west-1.amazonaws.com/assets/images/stars/${
                     this.cancellationData.hotel.starRating}.png`} alt="" />
            </SectionRow>
            <SectionRow title="Contact data">
              <small className="d-block">
                {`${this.cancellationData.hotel.address}`}
              </small>
              <small className="d-block">
                <a href={`tel:${this.cancellationData.hotel.phoneNumber}`}>
                  {this.cancellationData.hotel.phoneNumber}
                </a>
              </small>
              <small className="d-block">
                <a href={`mailto:${this.cancellationData.hotel.emailAddress}`}>
                  {this.cancellationData.hotel.emailAddress}
                </a>
              </small>
            </SectionRow>
            <SectionRow title="Reservation number">
              <small className="font-weight-bold">{this.cancellationData.number}</small>
            </SectionRow>
            <SectionRow title="Booked dates">
              <div>
                <small>Check in:  </small>
                <small className="font-weight-bold">{this.normalizedCheckInDate}</small>
              </div>
              <div>
                <small>Check out:  </small>
                <small className="font-weight-bold">{this.normalizedCheckOutDate}</small>
              </div>
            </SectionRow>
            <SectionRow title="Total price">
              <small className="font-weight-bold">
                {`${this.cancellationData.totalPrice.priceBeforeTax} ${this.cancellationData.totalPrice.currency}`}
              </small>
            </SectionRow>
            <SectionRow title="Cancellation policy" isLast={true}>
              <div>
                <small>Until {this.shortNormalizedCheckInDate}: </small>
                <small className="font-weight-bold">
                  {`${this.cancellationData.totalPrice.priceBeforeTax} ${this.cancellationData.totalPrice.currency}`}
                </small>
              </div>
              <div>
                <small>From {this.shortNormalizedCheckInDate}:  </small>
                <small className="font-weight-bold">
                  {`${this.cancellationData.totalPrice.priceAfterTax} ${this.cancellationData.totalPrice.currency}`}
                </small>
              </div>
            </SectionRow>
          </div>
        </Section>
        <div className="d-flex flex-column flex-sm-row justify-content-end my-5 mx-sm-0 mx-2">
          <a href="https://rooms.ryanair.com/" className="mr-3 core-btn c-text-grey">
            I changed my mind, don't cancel
          </a>
          <button onClick={this.context.cancelRequest} className="core-btn c-light-base bg-error-red">
            Cancel the reservation
          </button>
        </div>
      </div>
    );
  }
}

CancellationPending.propTypes = {
  data: PropTypes.object,
};

CancellationPending.contextTypes = {
  cancelRequest: PropTypes.func,
};

export default CancellationPending;

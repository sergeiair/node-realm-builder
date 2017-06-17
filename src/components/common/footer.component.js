import React from 'react';

const Footer = () => {
  return (
    <div className="w-100 py-3 px-5 bg-light-base grey-border-top">
      <div className="container w-100">
        <div className="row">
          <div className="col-sm-12 col-lg-4">
            <small className="c-text-grey">2017 © Ryanair DAC. All rights reserved.</small>
          </div>
          <div className="col-sm-12 col-lg-8 d-flex flex-column flex-md-row justify-content-end">
            <a className="mr-3" href="https://www.ryanair.com/ie/en/corporate/terms-of-use">
              <small>Terms of Use</small>
            </a>
            <a className="mr-3" href="https://www.ryanair.com/ie/en/useful-info/help-centre/terms-and-conditions">
              <small>General terms and conditions of carriage</small>
            </a>
            <a className="mr-3" href="https://www.ryanair.com/ie/en/corporate/privacy-policy">
              <small>Privacy policy</small>
            </a>
            <a className="mr-3" href="https://www.ryanair.com/ie/en/corporate/cookies">
              <small>Cookies</small>
            </a>
            <a className="mr-3" href="https://www.ryanair.com/ie/en/useful-info/help-centre/faq-overview/contact-us">
              <small>Contact us</small>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
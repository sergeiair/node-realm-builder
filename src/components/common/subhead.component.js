import React from 'react';

import PropTypes from 'prop-types';

const Subhead = (props) => {
  return (
    <div className="ml-sm-0 ml-2">
      <div className="mb-3 c-dark-blue">
        <h3 className="font-weight-normal">{props.title}</h3>
      </div>
      <div className="col-sm-12 col-lg-7 pl-0">
        <small className="c-text-grey">
          {props.text}
        </small>
      </div>
    </div>
  );
};

Subhead.PropTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};

export default Subhead;
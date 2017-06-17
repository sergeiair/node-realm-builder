import React from 'react';

import PropTypes from 'prop-types';

const SectionRow = (props) => {
  return (
    <div className={`row pt-2 pb-3 mx-4 ${!props.isLast ? 'grey-border-bottom' : ''}`}>
      <div className="col-sm-12 col-lg-3 pl-0">
        <small className="c-text-grey">
          {props.title}
        </small>
      </div>
      <div className="col-sm-12 col-lg-9 px-0 c-dark-blue">
        {props.children}
      </div>
    </div>
  );
};

SectionRow.PropTypes = {
  title: PropTypes.string,
  isLast: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
};

export default SectionRow;
import React from 'react';

import PropTypes from 'prop-types';

const Section = (props) => {
  return (
    <div>
      <div className="mt-4 mb-2 ml-sm-0 ml-2 c-dark-blue">
        <h4>{props.title}</h4>
      </div>
      <div className="container p-0 bg-light-base grey-border ">
        {props.children}
      </div>
    </div>
  );
};

Section.PropTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
};

export default Section;
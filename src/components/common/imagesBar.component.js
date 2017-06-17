import React from 'react';

import PropTypes from 'prop-types';

const ImagesBar = (props) => {
  return (
    <div className="row m-0 p-0 bg-lines-grey">
      <div className="col p-0 overflow-h">
        <img className="w-100" src={props.images[0]} alt=""/>
      </div>
      <div className="col p-0 overflow-h">
        <img className="h-100"  src={props.images[1]} alt=""/>
      </div>
    </div>
  );
};

ImagesBar.PropTypes = {
  images: PropTypes.arrayOf(PropTypes.string),
};

export default ImagesBar;
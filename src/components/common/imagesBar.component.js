import React from 'react';

import PropTypes from 'prop-types';

const ImagesBar = (props) => {
  return (
    <div className="row m-0 p-0 bg-lines-grey">
      <div className="col-sm-12 col-lg-6 p-0 overflow-h" style={{height: '183px'}}>
        <div role="button" className="w-100 h-100 image-bg"
          style={{backgroundImage: `url(${props.images[0]})`}}
          onClick={props.openMap}>
        </div>
      </div>
      <div className="col-sm-12 col-lg-6 p-0 overflow-h" style={{height: '183px'}}>
        <div className="w-100 h-100 image-bg"
          style={{backgroundImage: `url(${props.images[1]})`}}>
        </div>
      </div>
    </div>
  );
};

ImagesBar.PropTypes = {
  openMap: PropTypes.func,
  images: PropTypes.arrayOf(PropTypes.string),
};

export default ImagesBar;
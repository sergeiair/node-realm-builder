import React from 'react';

const Loader = () => {
  return (
    <div className="w-100 py-5 text-center">
      <img src="https://rooms.ryanair.com/assets/img/loading_icon.svg" alt=""/>
      <h3 className="m-3 font-weight-normal c-rooms-blue">Fetching booking data...</h3>
    </div>
  );
};

export default Loader;
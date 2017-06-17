import React from 'react';

const TopBar = () => {
  return (
    <div className="w-100 py-3 px-4 bg-rooms-blue bar">
      <a href="https://rooms.ryanair.com/">
        <img className="d-block h-100" src="https://rooms.ryanair.com/assets/ryanair/rooms/v2/roomslogo.svg" alt=""/>
      </a>
    </div>
  );
};

export default TopBar;
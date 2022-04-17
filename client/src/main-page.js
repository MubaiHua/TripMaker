import React from 'react';
import NavBar from './components/navBar'
import Map from './map.js'

const MainPage  = () => {
  return (
    <div className='flex-col h-screen overflow-hidden'>
        <NavBar/>
      <div className='w-2/3 border-x-2 border-pastel-brown'>
        <Map/>
      </div>
      <div className='w-1/3'>
        RIGHT MENU
      </div>
    </div>
  );
}

export default MainPage;


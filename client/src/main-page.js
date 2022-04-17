import React from 'react';
import NavBar from './components/navBar'
import Map from './Map.js'
import AuthPage from './components/authPage';

const MainPage  = () => {
  return (
    <div className='flex-col h-screen overflow-hidden'>
        <NavBar/>
      <div className='border-x-2 border-pastel-brown'>
        <Map/>
      </div>
    </div>
  );
}

export default MainPage;


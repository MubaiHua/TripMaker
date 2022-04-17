import logo from './logo.svg';
import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import NavBar from './components/navBar'
import Map from './Map.js'

function App() {
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

export default App;


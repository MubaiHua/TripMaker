import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import NavBar from './components/navBar'
import LeftMenu from './components/leftMenu';

function App() {
  return (
    <div className='flex-col h-screen overflow-hidden'>
      <NavBar/>
      <div className='flex-row flex h-full'>
      <LeftMenu/>
      <div className='w-2/3 border-2'>
        MAP
      </div>
      <div className='w-1/3 border-2'>
        RIGHT MENU
      </div>
      </div>
    </div>
  );
}

export default App;


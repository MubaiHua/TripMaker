import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -34,
  lng: 151
};

class MyComponents extends Component {
  render() {
    return (
      <>
        <h1>Mappable</h1>
        <h4>The map:</h4>
        <LoadScript
          googleMapsApiKey="AIzaSyCfB1IHaGFizVCHLWOZJsm3-UwabmKV-eo"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            { /* Child components, such as markers, info windows, etc. */ }
            <></>
          </GoogleMap>
        </LoadScript>

      </>
    )
  }
}

export default MyComponents;

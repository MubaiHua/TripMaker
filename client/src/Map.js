import "./App.css";
import React, { Component, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import mapStyle from "./map_style";
import usePlaceAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import axios from "axios";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 34.070291,
  lng: -118.440891,
};

const options = {
  styles: mapStyle,
  disableDefaultUI: true,
  zoomControl: true,
};

export default function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  useEffect(() => {
    async function fetchPoints() {
      const config = { headers: { "Content-Type": "application/json" } };
      const code = "123456";
      const body = { code };
      const res = await axios.post(
        "http://localhost:8080/api/mapRoutes/getMap",
        body,
        config
      );
      var points = [];
      for (let i = 0; i < res.data.points.length; i++) {
        points.push({
          lat: res.data.points[i].lat,
          lng: res.data.points[i].lng,
        });
      }
      setMarkers(points);
    }
    fetchPoints();
  }, []);

  const handle_search_add_point = (point) => {
    setMarkers((current) => [
      ...current,
      {
        lat: point.lat,
        lng: point.lng,
        order:
          current === undefined || current.length === 0
            ? 0
            : current[current.length - 1].order + 1,
      },
    ]);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <Search handle_search_add_point={handle_search_add_point} />

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        options={options}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.order}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <p>
                Location lat:{selected.lat} lng:{selected.lng}
              </p>
            </div>
          </InfoWindow>
        ) : null}
        <MapDirectionsRenderer
          places={markers}
          travelMode={window.google.maps.TravelMode.WALKING}
        />
      </GoogleMap>
    </div>
  );
}

function Search(props) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlaceAutocomplete({
    requestOptions: {
      location: { lat: () => 34.070291, lng: () => -118.440891 },
      radius: 200 * 1000,
    },
  });

  return (
    <Combobox
      onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          props.handle_search_add_point({ lat, lng });
        } catch (error) {
          console.log("Error");
        }
        console.log(address);
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter an address"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

function MapDirectionsRenderer(props) {
  let [directions, setDirections] = React.useState();
  let [error, setError] = React.useState();


  useEffect(() => {
    const { places, travelMode } = props;
    if(places.length !== 0){

        const waypoints = places.map((p) => ({
            location: { lat: p.lat, lng: p.lng },
            stopover: true,
          }));
      
          const origin = waypoints.shift().location;
          const destination = waypoints.pop().location;
      
          const directionsService = new window.google.maps.DirectionsService();
          directionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: travelMode,
              waypoints: waypoints,
            },
            (result, status) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                setDirections(result);
              } else {
                setError(result);
              }
            }
          );
    }
  }, [props]);

  return <DirectionsRenderer directions={directions} />;
}

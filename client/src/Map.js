import "./App.css";
import React, { Component } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
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
import axios from 'axios';

const libraries = ["places"];

const mapContainerStyle = {
  width: "50vw",
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

  const handle_search_add_point = (point) =>{
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
  }

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div>
      <Search handle_search_add_point = {handle_search_add_point}/>

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
              <h2>
                Location lat:{selected.lat} lng:{selected.lng}
              </h2>
            </div>
          </InfoWindow>
        ) : null}
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
    <div className="absolute top-123px left-25px"> 
    <Combobox
      onSelect={async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          props.handle_search_add_point({lat, lng});
        } catch (error) {
          console.log("Error");
        }
        console.log(address);
      }}
    >
      <ComboboxInput className="font-roboto-slab w-300px outline-0  border-2 border-brownish/50 text-14px h-32px px-5px w-11/12 rounded-sm"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Search for an address"
      />
      <ComboboxPopover className="">
        <ComboboxList className="font-roboto-slabtext-14px border-green-yellow/75 border-2 rounded-sm">
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption className="hover:bg-green-yellow" key={id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
    </div>
  );
}

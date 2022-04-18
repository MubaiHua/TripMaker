import React, { Component, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsRenderer,
} from "@react-google-maps/api";
import mapStyle from "./map-style";
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
import RightPanel from "./right_panel";

const libraries = ["places"];

const mapContainerStyle = {
  width: '100%',
  height: '100%',
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
  const [hasAdded, setHasAdded] = React.useState(false);

  useEffect(() => {
    async function fetchPoints() {
      const config = { headers: { "Content-Type": "application/json" } };
      const code = sessionStorage.getItem("code");
      if (code === null) {
        window.location.href = "/";
      }
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

  const resetMarkers = (points) => {
    const newMarker = [];
    for (let i = 0; i < points.length; i++) {
      newMarker.push({
        lat: points[i].lat,
        lng: points[i].lng,
      });
    }
    setMarkers(newMarker);
    const config = { headers: { "Content-Type": "application/json" } };
    const code = sessionStorage.getItem("code");
    const body = { code, points: newMarker };
    axios.post(
      "http://localhost:8080/api/mapRoutes/updateMap",
      body,
      config
    );
  };

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
    setHasAdded(true);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  const onClickSubmit = () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const code = sessionStorage.getItem("code");
    const body = { code, points: markers };
    const res = axios.post(
      "http://localhost:8080/api/mapRoutes/updateMap",
      body,
      config
    );
    setHasAdded(false);
  };

  const onClickDiscard = () => {
    setMarkers((current) => current.slice(0, -1));
    setHasAdded(false);
  };

  return (
    <div class="grid grid-cols-5 h-full flex flex-row">

      {/* Left Menu */}
      <div id='LeftMenu' class='h-full grid grid-cols-1'>
        <div class='h-fit'>
          <LeftMenu
            hasAdded={hasAdded}
            onClickSubmit={onClickSubmit}
            onClickDiscard={onClickDiscard}
            handle_search_add_point={handle_search_add_point}
          />
        </div>
      </div>

      {/* Map */}
      <div id='Map' class='h-700px w-full p-2 col-span-3 '>
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
                {" "}
                Location lat:{selected.lat} lng:{selected.lng}{" "}
              </div>
            </InfoWindow>
          ) : null}
          <MapDirectionsRenderer
            places={markers}
            travelMode={window.google.maps.TravelMode.WALKING}
          />
        </GoogleMap>
      </div>
      
      {/* Right panel */}
      <div id='RightPanel'>
        <RightPanel markers={markers} resetMarkers={resetMarkers} />
      </div>

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
    <div>
      <Combobox
        className="w-full"
        id='combo-box'
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
          className="font-roboto-slab w-full outline-0 border-2 border-brownish/50 text-14px h-32px px-5px rounded-sm"
          value={value}
          onChange={
            !props.hasAdded
              ? (e) => {
                  setValue(e.target.value);
                }
              : null
          }
          disabled={!ready}
          placeholder="Search for an address"
        />
        <ComboboxPopover className="">
          <ComboboxList className="font-roboto-slabtext-14px rounded-sm">
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption
                  className="hover:bg-green-yellow"
                  key={id}
                  value={description}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

function MapDirectionsRenderer(props) {
  let [directions, setDirections] = React.useState();
  let [error, setError] = React.useState();

  useEffect(() => {
    const { places, travelMode } = props;
    if (places.length > 1) {
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

function LeftMenu(props) {
  return (
    <div class='bg-pastel-brown/50 h-screen border-pastel-brown'>
      <div className="grid grid-cols-1 flex border-r-2 p-4">
        
        <div className="font-roboto-slab max-h-32px">Search for Destination</div>

        <div class=''>
          <Search
            handle_search_add_point={props.handle_search_add_point}
            hasAdded={props.hasAdded}
            id='search-bar'
          />
        </div>

        <form className="hidden h-32px">
          <input
            type="text"
            className="hidden text-14px pl-5px font-roboto-slab border-2 border-pastel-brown-40"
          />
        </form>

        {props.hasAdded ? (
          <div class='grid grid-cols-2 pt-4'>
            {}
            <div class='px-2 justify-self-end'>
              <button class='self-center rounded-lg bg-indigo-300 px-2 py-1 hover:bg-indigo-400'
              onClick={props.onClickSubmit}>Submit</button>
            </div>
            <div class='px-2 justify-self-start'>
              <button class='self-center rounded-lg bg-indigo-300 px-2 py-1 hover:bg-indigo-400'
              onClick={props.onClickDiscard}>Discard</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>

  );
}

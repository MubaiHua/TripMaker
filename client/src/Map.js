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
  const [hasAdded, setHasAdded] = React.useState(false);

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
    setHasAdded(true);
  };

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  const onClickSubmit = () => {
    console.log("123");
    const config = { headers: { "Content-Type": "application/json" } };
    const code = "123456";
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
    <div className="h-full flex flex-row">
      <LeftMenu hasAdded={hasAdded} onClickSubmit={onClickSubmit} onClickDiscard={onClickDiscard} />
      <Search handle_search_add_point={handle_search_add_point} hasAdded= {hasAdded}/>
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
        className="w-324px"
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
          onChange={!props.hasAdded? (e) => {
            setValue(e.target.value);
          } : null}
          disabled={!ready}
          placeholder="Search for an address"
        />
        <ComboboxPopover className="">
          <ComboboxList className="font-roboto-slabtext-14px border-green-yellow/75 border-2 rounded-sm">
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
    console.log(places)
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
    <div className="w-full bg-pastel-brown/50 border-r-2 border-pastel-brown p-20px">
      <div className="font-roboto-slab mb-5px">Search for Destination</div>
      <form className="flex flex-col">
        <input
          type="text"
          className="hidden text-14px pl-5px font-roboto-slab border-2 border-pastel-brown-40 h-32px"
        />
      </form>
      <br />
      <br />
      <br />
      {props.hasAdded? <button onClick={props.onClickSubmit}>Submit</button> : null}
      <br />
      {props.hasAdded? <button onClick={props.onClickDiscard}>Discard</button> : null}
    </div>
  );
}

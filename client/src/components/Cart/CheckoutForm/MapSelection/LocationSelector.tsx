import React, { useEffect, useState } from "react";
import Autocomplete from "./MapComponents/Autocomplete";
import GoogleMapReact from "google-map-react";
import Marker from "./MapComponents/MapMarker";

type MapState = {
  mapApiLoaded: boolean;
  mapInstance: any;
  mapApi: any;
  geoCoder: any;
  places: any;
  center: any;
  zoom: number;
  address: "";
  draggable: true;
  lat: number | null;
  lng: number | null;
};

const { REACT_APP_GOOGLE_API_KEY } = process.env;

const LocationSelector = () => {
  const [mapState, setMapState] = useState<MapState>({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    geoCoder: null,
    places: [],
    center: [0, 0],
    zoom: 9,
    address: "",
    draggable: true,
    lat: null,
    lng: null,
  });

  useEffect(() => {
    setCurrentLocation();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(mapState.center, mapState.lat, mapState.lng);
  }, [mapState.center]);

  // Get browsers current location
  const setCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Position current", position);
        setMapState({
          ...mapState,
          center: [position.coords.latitude, position.coords.longitude],
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const onChangeMap = (e) => {
    setMapState({ ...mapState, center: e.center });
  };
  const onMapMarkerInteraction = (e) => console.log("MarkerInteraction", e);
  const onMapMarkerInteractionUp = (e) => console.log("MarkerInteractionUp", e);
  const onClickMap = (e) => console.log("click mpa", e);

  return (
    <div style={{ width: "50vw", height: "50vh" }}>
      {mapState.mapApiLoaded && (
        <Autocomplete
          mapState={mapState}
          setMapState={setMapState}
          map={mapState.mapInstance}
          mapApi={mapState.mapApi}
          addPlace={addPlace}
          clearSearchBox={false}
        />
      )}
      <GoogleMapReact
        center={mapState.center}
        zoom={mapState.zoom}
        draggable={mapState.draggable}
        onChange={onChangeMap}
        onChildMouseDown={onMapMarkerInteraction}
        onChildMouseUp={onMapMarkerInteractionUp}
        onChildMouseMove={onMapMarkerInteraction}
        onChildClick={() => console.log("child click")}
        onClick={onClickMap}
        bootstrapURLKeys={{
          key: `${REACT_APP_GOOGLE_API_KEY}`,
          libraries: ["places", "geometry"],
        }}
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => {
          setMapState({
            ...mapState,
            mapApiLoaded: true,
            mapInstance: map,
            mapApi: maps,
          });
        }}
      >
        <Marker
          text={mapState.address}
          latitude={mapState.lat}
          longitude={mapState.lng}
          onClick={() => console.log("clicked marker")}
        />
      </GoogleMapReact>
    </div>
  );
};

export default LocationSelector;

/* ----------------- HELPERS ------------------------- */

const addPlace = (place, mapState, setMapState, mapApi) => {
  setMapState({
    ...mapState,
    places: [place],
    latitude: place.geometry.location.lat(),
    longitude: place.geometry.location.lng(),
  });
  generateAddress(mapApi, mapState, setMapState);
};

const generateAddress = (mapApi, mapState, setMapState) => {
  const geocoder = new mapApi.Geocoder();

  geocoder.geocode(
    { location: { lat: mapState.latitude, lng: mapState.longitude } },
    (results, status) => {
      console.log(results);
      console.log(status);
      if (status === "OK") {
        if (results[0]) {
          setMapState({
            ...mapState,
            zoom: 12,
            address: results[0].formatted_address,
          });
        } else {
          window.alert("No results found");
        }
      } else {
        window.alert("Geocoder failed due to: " + status);
      }
    }
  );
};

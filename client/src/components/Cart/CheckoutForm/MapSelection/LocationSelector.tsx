import React, { useEffect, useState } from "react";
import Autocomplete from "./MapComponents/Autocomplete";
import GoogleMapReact from "google-map-react";
import Marker from "./MapComponents/MapMarker";
import "./styles.css";

type MapState = {
  mapApiLoaded: boolean;
  mapInstance: any;
  mapApi: any;
  geoCoder: any;
  places: any;
  center: any;
  zoom: number;
  address: "";
  draggable: boolean;
  lat: number | null;
  lng: number | null;
  active: boolean;
};

type ReturnLocation = {
  returnLatitude: number;
  returnLongitude: number;
  returnFullAddress: string;
};

const { REACT_APP_GOOGLE_API_KEY } = process.env;

const LocationSelector = ({
  setReturnLocation,
  active,
  setActive,
  mapWidth,
  mapHeight,
}: {
  mapWidth: string;
  mapHeight: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  setReturnLocation: React.Dispatch<React.SetStateAction<ReturnLocation>>;
}) => {
  const [mapState, setMapState] = useState<MapState>({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    geoCoder: null,
    places: [],
    center: [0, 0],
    zoom: 15,
    address: "",
    draggable: false,
    lat: null,
    lng: null,
    active,
  });

  const [onMapChangeLoading, setOnMapChangeLoading] = useState<
    "loading" | "loaded" | "error"
  >("loaded");

  useEffect(() => {
    setMapState({ ...mapState, active: active });
    // eslint-disable-next-line
  }, [active]);

  useEffect(() => {
    setCurrentLocation();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (mapState.center) {
      setReturnLocation({
        returnFullAddress: mapState.address,
        returnLatitude: mapState.lat,
        returnLongitude: mapState.lng,
      });
    }
    // eslint-disable-next-line
  }, [mapState.center]);

  // Get browsers current location
  const setCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMapState({
          ...mapState,
          center: [position.coords.latitude, position.coords.longitude],
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const onChangeMap = async (e) => {
    if (onMapChangeLoading === "loaded") {
      setOnMapChangeLoading("loading");
      setTimeout(async () => {
        try {
          const geocoder = new mapState.mapApi.Geocoder();
          const { results } = await geocoder.geocode({
            location: { lat: e.center.lat, lng: e.center.lng },
          });

          console.log("your location", results[0].formatted_address);
          setMapState({
            ...mapState,
            center: e.center,
            address: results[0].formatted_address,
          });
          setOnMapChangeLoading("loaded");
        } catch (err) {
          setOnMapChangeLoading("error");
        }
      }, 3000);
    }
  };

  const onMapMarkerInteraction = (e) => console.log("MarkerInteraction", e);
  const onMapMarkerInteractionUp = (e) => console.log("MarkerInteractionUp", e);
  const onClickMap = (e) => console.log("click mpa", e);

  switch (mapState.active) {
    case false:
      return <span></span>;

    case true:
      return (
        <div className="popUpBox">
          <div className="map" style={{ width: mapWidth, height: mapHeight }}>
            {mapState.mapApiLoaded && (
              <Autocomplete
                mapState={mapState}
                setMapState={setMapState}
                map={mapState.mapInstance}
                mapApi={mapState.mapApi}
                addPlace={addPlace}
                clearSearchBox={false}
                setActive={setActive}
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
        </div>
      );
  }
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
      console.log("geocoder results", results);
      console.log("geocoder statis", status);
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

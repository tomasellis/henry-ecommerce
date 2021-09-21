// Autocomplete.js
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  text-align: center;
`;

type AutocompleteProps = {
  clearSearchBox: boolean;
  map: any;
  mapApi: any;
  mapState: MapState;
  setMapState: (value: React.SetStateAction<MapState>) => void;
  addPlace: (place, mapState, setMapState, mapApi) => void;
};

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

const Autocomplete = (props: AutocompleteProps) => {
  const options = {
    // restrict your search to a specific type of result
    types: ["address"],
    // restrict your search to a specific country, or an array of countries
    componentRestrictions: { country: ["ar"] },
  };

  const [autocomplete, setAutocomplete] = useState<any>();
  const [searchInput, setSearchInput] = useState("");

  let inputRef = useRef(null);

  useEffect(() => {
    const Autocomplete = new props.mapApi.places.Autocomplete(inputRef.current);
    Autocomplete.setFields([
      "address_component",
      "geometry",
      "formatted_address",
      "name",
    ]);
    setAutocomplete(Autocomplete);
  }, []);

  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        props.setMapState({
          ...props.mapState,
          center: [
            place.geometry.location.lat(),
            place.geometry.location.lng(),
          ],
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });

        if (!place.geometry || !place.geometry.location) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          props.map.fitBounds(place.geometry.viewport);
          props.map.setZoom(19);
        } else {
          props.map.setCenter(place.geometry.location);
          props.map.setZoom(19);
        }
      });
    }
  }, [autocomplete]);

  // Clear searchbox
  useEffect(() => {
    if (props.clearSearchBox === true) {
      setSearchInput("");
      props.clearSearchBox = false;
    }
    // eslint-disable-next-line
  }, [props.clearSearchBox]);

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();

    if (!place.geometry) return;
    if (place.geometry.viewport) {
      props.map.fitBounds(place.geometry.viewport);
    } else {
      props.map.setCenter(place.geometry.location);
      props.map.setZoom(17);
    }
  };

  //   const onPlaceChanged = (map, addplace, autocomplete) => {
  //     console.log("map", map, addplace);
  //     const place = autocomplete.getPlace();
  //     if (!place.geometry) return;
  //     if (place.geometry.viewport) {
  //       map.fitBounds(place.geometry.viewport);
  //     } else {
  //       map.setCenter(place.geometry.location);
  //       map.setZoom(17);
  //     }
  //     addPlace(place);
  //     console.log("inputref", inputRef.current);
  //     inputRef.current.blur();
  //   };

  return (
    <Wrapper>
      <input
        className="search-input"
        type="text"
        value={searchInput}
        ref={inputRef}
        onChange={(e) => setSearchInput(e.target.value)}
        onFocus={() => setSearchInput("")}
        placeholder="Enter a location"
      />
    </Wrapper>
  );
};

export default Autocomplete;

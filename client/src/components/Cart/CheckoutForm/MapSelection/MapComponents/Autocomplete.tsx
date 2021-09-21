// Autocomplete.js
import { Button } from "@material-ui/core";
import { SaveOutlined } from "@material-ui/icons";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "./styles.css";
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
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
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
  draggable: boolean;
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
    console.log("InputRef", inputRef);
  }, [inputRef]);
  useEffect(() => {
    const Autocomplete = new props.mapApi.places.Autocomplete(
      inputRef.current,
      options
    );
    Autocomplete.setFields([
      "address_component",
      "geometry",
      "formatted_address",
      "name",
    ]);
    setAutocomplete(Autocomplete);
    // eslint-disable-next-line
  }, []);

  // Whenever a user selects a place
  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Placerino", place, "location", place.geometry);
        if (place.geometry !== undefined) {
          props.setMapState({
            ...props.mapState,
            center: [
              place.geometry.location.lat(),
              place.geometry.location.lng(),
            ],
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.formatted_address,
            zoom: 18,
          });

          setSearchInput(place.formatted_address);

          if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert(
              "No details available for input: '" + place.name + "'"
            );
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
        }
      });
    }
    // eslint-disable-next-line
  }, [autocomplete]);

  // Clear searchbox
  useEffect(() => {
    if (props.clearSearchBox === true) {
      setSearchInput("");
      props.clearSearchBox = false;
    }
    // eslint-disable-next-line
  }, [props.clearSearchBox]);

  return (
    <Wrapper>
      <input
        style={{ borderRadius: "8px", border: "none", padding: "5px" }}
        className="search-input"
        type="text"
        value={searchInput}
        ref={inputRef}
        onChange={(e) => setSearchInput(e.target.value)}
        onFocus={() => setSearchInput("")}
        placeholder="Find your address"
      />{" "}
      <Button
        color="primary"
        variant="contained"
        onClick={() => props.setActive(false)}
        endIcon={<SaveOutlined style={{ color: "white" }} />}
      >
        <span style={{ color: "white" }}> {"SAVE"}</span>
      </Button>
      <br></br>
    </Wrapper>
  );
};

export default Autocomplete;

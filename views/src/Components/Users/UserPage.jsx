import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  CustomInput,
  Button,
  Badge,
  Container
} from "reactstrap";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const apiKey = "AIzaSyBIGLbrD_tHjQZFi1GQ61wRi_ltzkJ8w3A";

export class MapContainer extends React.Component {
  render() {
    const style = {
      width: "62.40%",
      height: "62.5%"
    };
    return (
      <div className="container-fluid border-bottom">
        <div className="map">
          <Map google={this.props.google} zoom={14} style={style}>
            <Marker onClick={this.onMarkerClick} name={"Current location"} />

            <InfoWindow onClose={this.onInfoWindowClose}>
              <div>{/* <h1>{this.state.selectedPlace.name}</h1> */}</div>
            </InfoWindow>
          </Map>
        </div>
        <div style={{ marginTop: "5%", marginBottom: "2%" }}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <h3>
                <Badge>From</Badge>
              </h3>
            </InputGroupAddon>
            <Input />
          </InputGroup>
          <InputGroup>
            <Input />
            <InputGroupAddon>
              <h3>
                <Badge>To</Badge>
              </h3>
            </InputGroupAddon>
          </InputGroup>

          <CustomInput
            type="radio"
            id="exampleCustomRadio"
            name="customRadio"
            label="Click to save this route"
          >
            <Button style={{ marginLeft: "5%" }}>Route it!</Button>
          </CustomInput>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey
})(MapContainer);

MapContainer.defaultProps = {
  zoom: 16,
  initialCenter: {
    lat: 51.5178767,
    lng: -0.0762007
  },
  centerAroundCurrentLocation: true,
  visible: true
};

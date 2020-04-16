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
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      darkMode: false
    };
  }

  render() {
    console.log(this.props);
    // const style = {
    //   width: "100%",
    //   height: "100%",
    //   position: "relative"
    // };
    return (
      <Container>
        <div>
          <div className="container-fluid border-bottom" id="map">
            <div id="map">
              <Map google={this.props.google} zoom={14}>
                <Marker
                  onClick={this.onMarkerClick}
                  name={"Current location"}
                />

                <InfoWindow onClose={this.onInfoWindowClose}></InfoWindow>
              </Map>
            </div>
          </div>
        </div>
        <div>
          <Container>
            <div>
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
          </Container>
        </div>
      </Container>
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

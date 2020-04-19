import React from "react";
// import InputRoute from "../input";
import {
  InputGroup,
  Input,
  InputGroupAddon,
  CustomInput,
  Button,
  Badge,
  Container,
} from "reactstrap";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { Route } from "react-router-dom";
const apiKey = "AIzaSyBIGLbrD_tHjQZFi1GQ61wRi_ltzkJ8w3A";

export class MapContainer extends React.Component {
  state = {
    infoPostcode: "",
    postcode: "",
    origins: {
      lat: 51.515103,
      lng: -0.508119,
    },
    destinations: { lat: 51.510907, lng: -0.590733 },
    route: [],
  };

  handleCoords = (longitude, latitude) => {
    let origins = {
      lat: latitude,
      lng: longitude,
    };

    this.state.route.push(origins);
    console.log(this.state.route);
  };

  handlePostcode = (event) => {
    this.setState({
      postcode: event.target.value,
    });
    this.getCoordsPostcode(event.target.value);
  };

  onMarkerClick() {
    console.log("hello");
  }

  getCoordsPostcode = (postcode) => {
    fetch(`https://api.postcodes.io/postcodes/${postcode}`)
      .then((response) => {
        return response.json();
      })
      .then((result) =>
        this.handleCoords(result.result.longitude, result.result.latitude)
      )
      .catch((err) => console.log(err, "errorrrr"));
  };

  calculateDistance() {
    const { google } = this.props;
    console.log(google);
    const { route, origins, destinations } = this.state;

    let origin = route[0];
    let destination = route[1];
    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: "WALKING",
      },
      (response, status) => {
        console.log("response", response);
        console.log("status", status);
      }
    );
  }

  render() {
    const { posts, latitude, longitude, google } = this.props;

    return (
      <div>
        <div>
          <Container>
            <div style={{ margin: "40px" }}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <h3>
                    <Badge>From</Badge>
                  </h3>
                </InputGroupAddon>
                <Input onChange={this.handlePostcode.bind(this)} />
              </InputGroup>
              <InputGroup>
                <Input onChange={this.handlePostcode.bind(this)} />
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
                <Button onClick={this.calculateDistance()}>rOUTE IT</Button>
              </CustomInput>
            </div>
          </Container>
        </div>
        <div className="container-fluid border-bottom" id="map">
          <div id="map">
            <Map
              google={google}
              initialCenter={this.state.origins}
              onClick={this.mapClicked}
              zoom={12}
              centerAroundCurrentLocation={true}
            >
              <InfoWindow
              // marker={this.state.activeMarker}
              // visible={this.state.showingInfoWindow}
              >
                <div className="marker">
                  <a href=""></a>
                </div>
              </InfoWindow>
            </Map>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey,
})(MapContainer);

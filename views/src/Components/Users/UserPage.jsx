import React from "react";
import Routes from "../routes";
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

const apiKey = "AIzaSyDro0XKEZYd8mj42cXWVukmO0WKJstaAYs&callback=";
const apiKey2 = "AIzaSyBIGLbrD_tHjQZFi1GQ61wRi_ltzkJ8w3A";

export class MapContainer extends React.Component {
  state = {
    postcode: "",
    route: [],
  };

  handleCoords = (longitude, latitude) => {
    let postCodeCoords = {
      lat: latitude,
      lng: longitude,
    };

    this.state.route.push(postCodeCoords);
    console.log(this.state.route);
  };

  handlePostcode = (event) => {
    this.setState({
      postcode: event.target.value,
    });
    this.getCoordsPostcode(event.target.value);
  };

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

  calculateRoute() {
    const { route } = this.state;

    let origin = route[0];
    let destination = route[1];

    this.displayRouteService(origin, destination);
    this.calculateDistance(origin, destination);
    this.state.route = [];
  }

  // route calculate response
  displayRouteService(origin, destination) {
    const { google } = this.props;
    const displayRouteService = new google.maps.DirectionsService();
    const displayUpdatedMap = new google.maps.DirectionsRenderer();
    let map = new google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: {
        lat: 51.515103,
        lng: -0.508119,
      },
    });
    displayRouteService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: "WALKING",
      },
      (response, status) => {
        console.log(
          "response",
          response,
          displayUpdatedMap.setDirections(response)
        );
        console.log("status", status);
      }
    );
    displayUpdatedMap.setMap(map);
  }

  //more detailed calculated response
  calculateDistance(origin, destination) {
    const { google } = this.props;
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
    const { google } = this.props;

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
                <Button onClick={() => this.calculateRoute()}>Route it</Button>
              </CustomInput>
            </div>
          </Container>
          <Routes />
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

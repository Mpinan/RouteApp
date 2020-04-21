import React from "react";
import Routes from "../routes";
import RouteForm from "../input";
import {
  Input,
  FormGroup,
  Button,
  Badge,
  Container,
  Row,
  Col,
} from "reactstrap";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const apiKey = "AIzaSyDro0XKEZYd8mj42cXWVukmO0WKJstaAYs&callback=";
const apiKey2 = "AIzaSyBIGLbrD_tHjQZFi1GQ61wRi_ltzkJ8w3A";

export class MapContainer extends React.Component {
  state = {
    postcode: "",
    route: [],
    selectRoute: this.displayRouteService.bind(this),
    calculateRoute: this.calculateRoute.bind(this),
  };

  handleCoords = (longitude, latitude) => {
    let postCodeCoords = {
      lat: latitude,
      lng: longitude,
    };

    this.state.route.push(postCodeCoords);
    console.log(this.state.route);
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

  render() {
    const { google } = this.props;

    return (
      <div>
        <div>
          <Container>
            <div style={{ margin: "40px" }}>
              <div className="d-inline">
                <RouteForm
                  handleCoords={this.getCoordsPostcode}
                  calculateRoute={this.state.calculateRoute}
                />
              </div>
            </div>
          </Container>
          <Routes selectRoute={this.state.selectRoute} />
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
              <InfoWindow>
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

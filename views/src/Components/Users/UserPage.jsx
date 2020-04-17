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
const apiKey = "AIzaSyBIGLbrD_tHjQZFi1GQ61wRi_ltzkJ8w3A";

export class MapContainer extends React.Component {
  state = {
    postcode: "",
    origins: {
      lat: 51.515103,
      lng: -0.508119,
    },
    destinations: { lat: 51.510907, lng: -0.590733 },
  };

  handleOrigin = (event) => {
    this.setState({
      origin: event.target.value,
    });
  };

  handleDestination = (event) => {
    this.setState({
      destination: event.target.value,
    });
  };

  onMarkerClick() {
    console.log("hello");
  }

  getCoordsPostcode = () => {
    fetch(`https://api.postcodes.io/postcodes/SL09BY`)
      .then((response) => {
        return response.json();
      })
      .then((result) => console.log(result, "----"))
      .catch((err) => console.log(err, "errorrrr"));
  };

  componentDidMount() {
    this.getCoordsPostcode();
  }

  calculateDistance() {
    const { google } = this.props;
    const { origins, destinations } = this.state;
    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origins],
        destinations: [destinations],
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
                <Input onChange={this.handleOrigin.bind(this)} />
              </InputGroup>
              <InputGroup>
                <Input onChange={this.handleDestination.bind(this)} />
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

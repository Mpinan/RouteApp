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
  onMarkerClick() {
    console.log("hello");
  }

  calculateDistance() {
    const { google } = this.props;
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [{ lat: 55.93, lng: -3.118 }],
        destinations: [{ lat: 50.087, lng: 14.421 }],
        travelMode: "DRIVING"
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
      <Container>
        <div>
          <div className="container-fluid border-bottom" id="map">
            <div id="map">
              <Map
                google={google}
                // initialCenter={{
                //   lat: Number(latitude),
                //   lng: Number(longitude)
                // }}
                onClick={this.mapClicked}
                zoom={14}
              >
                {/* {posts.lenght
                  ? posts.map(post => {
                      return (
                        <Marker
                          key={post.id}
                          title={post.location.name}
                          name={post.location.name}
                          onClick={this.onMarkerClick}
                          position={{
                            lat: post.location.latitude,
                            lng: post.location.longitude
                          }}
                        />
                      );
                    })
                  : null} */}
                <InfoWindow
                // marker={this.state.activeMarker}
                // visible={this.state.showingInfoWindow}
                >
                  <div className="marker">
                    <a href="">
                      {/* <h2>{this.state.selectedPlace.name}</h2> */}
                    </a>
                    {/* <img src={`${this.findUrl()}`} className="infoWindow-pic" /> */}
                  </div>
                  {this.calculateDistance()}
                </InfoWindow>
              </Map>
            </div>
          </div>
        </div>

        <Container>
          {/* <div style={{ marginBottom: "40px" }}>
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
          </div> */}
        </Container>
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

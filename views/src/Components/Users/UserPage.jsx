import React from "react";
import InputRoute from "../input";

import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const apiKey = "AIzaSyBIGLbrD_tHjQZFi1GQ61wRi_ltzkJ8w3A";

export class MapContainer extends React.Component {
  state = {
    origins: {
      lat: 51.515103,
      lng: -0.508119,
    },
    destinations: { lat: 51.510907, lng: -0.590733 },
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
          <InputRoute />
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
    );
  }
}

export default GoogleApiWrapper({
  apiKey: apiKey,
})(MapContainer);

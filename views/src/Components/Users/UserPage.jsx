import React from "react";
import {
  InputGroup,
  InputGroupAddon,
  Input,
  CustomInput,
  Button,
  Badge
} from "reactstrap";
import { compose, withProps } from "recompose";
import Geocode from "react-geocode";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
const apiKey = "AIzaSyBIGLbrD_tHjQZFi1GQ61wRi_ltzkJ8w3A";

Geocode.setApiKey(`${apiKey}`);

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={4} defaultCenter={{ lat: 44.6523, lng: -4.7245 }}>
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 41.6523, lng: -4.7245 }}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));

Geocode.fromAddress("Eiffel Tower").then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    console.log(lat, lng);
  },
  error => {
    console.error(error, "----");
  }
);

class UserPage extends React.PureComponent {
  state = {
    isMarkerShown: false,
    postCodeFrom: "",
    postCodeTo: ""
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    });
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  handlePostCodeFrom = event => {
    this.setState({
      postCodeFrom: event.target.value
    });
  };

  handlePostCodeTo = event => {
    this.setState({
      postCodeTo: event.target.value
    });
  };

  render() {
    return (
      <div>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
        <div style={{ marginTop: "5%", marginBottom: "2%" }}>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <h3>
                <Badge>From</Badge>
              </h3>
            </InputGroupAddon>
            <Input onChange={this.handlePostCodeFrom.bind(this)} />
          </InputGroup>
          <InputGroup>
            <Input onChange={this.handlePostCodeTo.bind(this)} />
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
        <div></div>
      </div>
    );
  }
}

export default UserPage;

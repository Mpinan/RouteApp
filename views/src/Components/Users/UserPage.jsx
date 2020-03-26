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

Geocode.setApiKey("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBIGLbrD_tHjQZFi1GQ61wRi_ltzkJ8w3A&callback=initMap",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={4} defaultCenter={{ lat: 40.4637, lng: 3.7492 }}>
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 40.4637, lng: 3.7492 }}
        onClick={props.onMarkerClick}
      />
    )}
  </GoogleMap>
));

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
    }, 3000);
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

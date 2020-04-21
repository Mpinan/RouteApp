import React, { Component } from "react";
import { Row, Col, FormGroup, Fade, Input, Button, Badge } from "reactstrap";

class RouteForm extends Component {
  state = {
    fadeIn: false,
    name: "walk",
    method: "walking",
    journey: {
      origin: {
        lat: 51.515103,
        lng: -0.508119,
      },
      destination: {
        lat: 51.515103,
        lng: -1.508119,
      },
    },
    route: [],
  };

  saveRoute() {
    let name = "work";
    let method = "walking";
    let journey = {
      origin: {
        lat: 51.515103,
        lng: -0.508119,
      },
      destination: {
        lat: 51.515103,
        lng: -1.508119,
      },
    };
    let route = [];
    route.push(name, method, journey);
    console.log(route);
  }

  handleFadeIn() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  handlePostcode = (event) => {
    this.setState({
      postcode: event.target.value,
    });
    this.props.handleCoords(event.target.value);
  };

  render() {
    return (
      <div>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Badge color="success">FROM</Badge>
              <Input
                onChange={this.handlePostcode.bind(this)}
                placeholder="Place origin POSTCODE"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Badge color="success">TO</Badge>
              <Input
                onChange={this.handlePostcode.bind(this)}
                placeholder="Place destination POSTCODE"
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="success" onClick={() => this.handleFadeIn()}>
          Save route
        </Button>
        <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
          <div>
            <FormGroup>
              <Badge color="success">NAME OF THE ROUTE</Badge>
              <Input placeholder="Work, Home, Shop..." />
            </FormGroup>
            <FormGroup>
              <Badge color="success">METHOD</Badge>
              <Input placeholder="WALKING or DRIVING" />
            </FormGroup>
            <Input onClick={this.saveRoute} type="checkbox" /> Save it
          </div>
        </Fade>
        <Button color="success" onClick={this.props.calculateRoute}>
          Route it
        </Button>
      </div>
    );
  }
}

export default RouteForm;

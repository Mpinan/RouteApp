import React, { Component } from "react";
import { Row, Col, FormGroup, Fade, Input, Button, Badge } from "reactstrap";

class RouteForm extends Component {
  state = {
    fadeIn: false,
  };

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
              <Badge for="exampleEmail">FROM</Badge>
              <Input
                onChange={this.handlePostcode.bind(this)}
                placeholder="Place origin POSTCODE"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Badge for="examplePassword">TO</Badge>
              <Input
                onChange={this.handlePostcode.bind(this)}
                placeholder="Place destination POSTCODE"
              />
            </FormGroup>
          </Col>
        </Row>
        <Button onClick={this.props.calculateRoute}>Route it</Button>
        <Button color="primary" onClick={() => this.handleFadeIn()}>
          Save route
        </Button>
        <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
          <div className={this.state.display}>
            <FormGroup className="d-block">
              <Badge for="exampleAddress">NAME OF THE ROUTE</Badge>
              <Input placeholder="Work, Home, Shop..." />
            </FormGroup>
            <FormGroup>
              <Badge for="exampleAddress2">METHOD</Badge>
              <Input placeholder="WALKING or DRIVING" />
            </FormGroup>
            <Button>Confirm</Button>
          </div>
        </Fade>
      </div>
    );
  }
}

export default RouteForm;

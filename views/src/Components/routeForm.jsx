import React, { Component } from "react";
import {
  Row,
  Col,
  FormGroup,
  Fade,
  Input,
  Button,
  Badge,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";

class RouteForm extends Component {
  state = {
    userID: sessionStorage.getItem("user_id"),
    fadeIn: false,
    name: "",
    method: "",
    route: this.props.route,
    modal: false,
  };

  addRoute() {
    fetch("http://localhost:3001/create/route", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: {
          name: this.state.name,
          method: this.state.method,
          origin: this.props.route[0],
          destination: this.props.route[1],
          userID: sessionStorage.getItem("userID"),
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .catch((err) => console.log(err));
  }

  handleModal = () => {
    this.setState({
      modal: !this.state.modal,
    });
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

  handleName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleMethod = (event) => {
    this.setState({
      method: event.target.value,
    });
  };

  render() {
    const { modal } = this.state;

    const saveRoute = () => {
      const { name, method, origin, destination, route } = this.state;
      route.push(name, method, origin, destination);
      this.addRoute(route);
    };

    return (
      <div>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Badge color="dark">FROM</Badge>
              <Input
                onChange={this.handlePostcode.bind(this)}
                placeholder="Place origin POSTCODE"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Badge color="dark">TO</Badge>
              <Input
                onChange={this.handlePostcode.bind(this)}
                placeholder="Place destination POSTCODE"
              />
            </FormGroup>
          </Col>
        </Row>
        <Button
          style={{ padding: 5, margin: 5 }}
          color="dark"
          onClick={this.props.calculateRoute}
        >
          Route it
        </Button>
        <Button
          style={{ padding: 5, margin: 5 }}
          color="dark"
          onClick={this.handleModal}
        >
          Save route
        </Button>
        <Fade in={this.state.fadeIn} tag="h5" className="mt-3">
          <div>
            <Modal isOpen={modal} toggle={this.handleModal}>
              <ModalBody>Name your route and save it</ModalBody>
              <div style={{ padding: 5, margin: 5 }}>
                <FormGroup>
                  <Badge color="dark">NAME OF THE ROUTE</Badge>
                  <Input
                    onChange={this.handleName.bind(this)}
                    placeholder="Work, Home, Shop..."
                  />
                </FormGroup>
                <Button
                  color="dark"
                  style={{ padding: 5, margin: 5 }}
                  onClick={saveRoute}
                >
                  Save it
                </Button>
                <Button
                  style={{ padding: 5, margin: 5 }}
                  color="dark"
                  onClick={this.handleModal}
                >
                  Cancel
                </Button>
              </div>
            </Modal>
          </div>
        </Fade>
      </div>
    );
  }
}

export default RouteForm;

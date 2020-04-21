import React, { Component } from "react";
import { Container, FormGroup, Label, Input } from "reactstrap";

class Route extends Component {
  render() {
    let routes = [
      {
        id: 0,
        name: "HOME",
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
        method: "WALKING",
      },
      {
        id: 1,
        name: "WORK",
        journey: {
          origin: {
            lat: 51.515103,
            lng: -0.508119,
          },
          destination: {
            lat: 50.515103,
            lng: -2.508119,
          },
        },
        method: "WALKING",
      },
    ];

    return (
      <Container>
        <FormGroup>
          <Label for="exampleSelectMulti">Select saved Route</Label>
          <Input
            type="select"
            name="selectMulti"
            id="exampleSelectMulti"
            multiple
          >
            {routes.map((route) => {
              return (
                <option
                  onDoubleClick={() =>
                    this.props.selectRoute(
                      route.journey.origin,
                      route.journey.destination
                    )
                  }
                >
                  {route.name}
                </option>
              );
            })}
          </Input>
        </FormGroup>
      </Container>
    );
  }
}

export default Route;

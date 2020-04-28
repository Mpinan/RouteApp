import React, { Component } from "react";
import { Container, FormGroup, Label, Input } from "reactstrap";

class Route extends Component {
  state = {
    routes: [],
  };

  getRoutes() {
    fetch("http://localhost:3001/routes")
      .then((response) => {
        return response.json();
      })
      .then((result) => this.setState({ routes: result }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getRoutes();
  }

  render() {
    return (
      <Container>
        <FormGroup>
          <Label>Select saved Route</Label>
          <Input
            type="select"
            name="selectMulti"
            id="exampleSelectMulti"
            multiple
          >
            {this.state.routes.map((route) => {
              return (
                <option
                  key={route.id}
                  onDoubleClick={() =>
                    this.props.selectRoute(route.origin, route.destination)
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

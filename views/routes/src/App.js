import React, { Component } from "react";
import { Container, Col } from "reactstrap";
import SignUp from "./Components/Users/Signup";

class App extends Component {
  createUser() {
    fetch("http://localhost:3001/user")
      .then(response => response.json())
      .then(items => this.setState({ items }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.createUser();
  }

  render() {
    return (
      <Container className="App">
        <Col>
          <SignUp buttonLabel="Sign up" />
        </Col>
      </Container>
    );
  }
}

export default App;

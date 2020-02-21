import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Container, Col } from "reactstrap";
import SignUp from "./Components/Users/Signup";
import NotFound from "./Components/notFound";

class App extends Component {
  state = { redirect: null };
  createUser() {
    fetch("http://localhost:3001/user")
      .then(response => response.json())
      .catch(err => console.log(err));
  }

  redirect() {
    this.setState({ redirect: "/user/:id" });
  }

  componentDidMount() {
    this.createUser();
  }

  render() {
    return (
      <Container className="App">
        <Col>
          <Router>
            <Route path="/" component={SignUp}></Route>
          </Router>
        </Col>
      </Container>
    );
  }
}

export default App;

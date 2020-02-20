import React, { Component } from "react";
import { Route, Redirect, Switch } from "../node_modules/react-router-dom";
import { Container, Col } from "reactstrap";
import SignUp from "./Components/Users/Signup";
import UserPage from "./Components/Users/UserPage";
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
        {/* <Switch> */}
        {/* <Route path="/user/:id" component={UserPage}></Route>
          <Route path="/not-found" component={NotFound}></Route> */}
        {/* <Redirect from="/" exact to="/user" />
          <Redirect to="/not-found" /> */}
        {/* </Switch> */}
        <Col>
          <SignUp buttonLabel="Sign up" />
        </Col>
      </Container>
    );
  }
}

export default App;

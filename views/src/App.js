import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter, Route } from "react-router-dom";
import SignUp from "./Components/Users/Signup";
import Login from "./Components/Users/Login";
import MainPage from "./Components/mainPage";

class App extends Component {
  state = {};

  render() {
    return (
      <Container className="App">
        <BrowserRouter>
          <Route exact path="/" component={MainPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;

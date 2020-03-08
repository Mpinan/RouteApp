import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter, Route } from "react-router-dom";
import SignUp from "./Components/Users/Signup";
import MainPage from "./Components/mainPage";

class App extends Component {
  state = {};

  render() {
    return (
      <Container className="App">
        <BrowserRouter>
          <Route exact path="/" component={MainPage} />
          <Route path="/signup" component={SignUp} />
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;

import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import SignUp from "./Components/Users/Signup";
import Login from "./Components/Users/Login";
import MainPage from "./Components/homePage";
import UserPage from "./Components/Users/UserPage";
import NotFound from "./Components/notFound";
import Profile from "./Components/Users/profile";

class App extends Component {
  state = {};

  render() {
    return (
      <Container className="App">
        <MainPage />
        <BrowserRouter>
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/userPage" component={UserPage} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/profile" component={Profile} />
        </BrowserRouter>
        {/* <Redirect to="/not-found" /> */}
      </Container>
    );
  }
}

export default App;

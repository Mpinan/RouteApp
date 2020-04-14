import React, { Component } from "react";
import { Container } from "reactstrap";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import SignUp from "./Components/Users/Signup";
import Login from "./Components/Users/Login";
import Home from "./Components/homePage";
import NavBar from "./Components/navbar";
import UserPage from "./Components/Users/UserPage";
import NotFound from "./Components/notFound";
import Profile from "./Components/Users/profile";

class App extends Component {
  render() {
    return (
      <Container className="App">
        <NavBar />
        <BrowserRouter>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/userPage" component={UserPage} />
            <Route exact path="/not-found" component={NotFound} />
            <Route exact path="/profile" component={Profile} />
            <Redirect exact path="/" exact to="/home" />
          </Switch>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;

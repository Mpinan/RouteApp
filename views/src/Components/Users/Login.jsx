import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    redirect: false,
    username: "",
    password: "",
    errors: {},
    logged: false,
    session: []
  };

  validate = () => {
    const errors = {};

    if (this.state.username.trim() === "") {
      errors.username = "Username is required";
    }
    if (this.state.password.trim() === "") {
      errors.password = "Password is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  findUser = () => {
    fetch("http://localhost:3001/login/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
    // .then(this.setRedirect());
  };

  handlePassword = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleUsername = event => {
    this.setState({
      username: event.target.value
    });
  };

  handleLogin = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
    this.findUser();
    this.setState({ login: true });
    this.setState({
      session: this.state.username
    });
  };

  setRedirect() {
    this.setState({
      redirect: true
    });
    console.log(this.state);
  }

  renderRedirectAfterLogIn() {
    if (this.state.redirect) {
      return <Redirect to="/userPage" />;
    }
  }

  render() {
    return (
      <Form style={{ margin: "50px 0" }}>
        {this.renderRedirectAfterLogIn()}
        <FormGroup row>
          <Label for="exampleEmail" sm={2} size="lg">
            Username
          </Label>
          <Col sm={10}>
            <Input
              type="username"
              name="username"
              id="exampleEmail"
              placeholder="username"
              bsSize="lg"
              onChange={this.handleUsername.bind(this)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleEmail2" sm={2}>
            Password
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              id="exampleEmail2"
              placeholder="password"
              onChange={this.handlePassword.bind(this)}
            />
          </Col>
        </FormGroup>
        <Button
          color="secondary"
          size="lg"
          block
          onClick={this.handleLogin.bind(this)}
        >
          Log in
        </Button>
      </Form>
    );
  }
}

export default Login;

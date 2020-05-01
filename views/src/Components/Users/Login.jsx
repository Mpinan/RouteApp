import React, { Component } from "react";
import {
  Container,
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { Redirect } from "react-router-dom";
import { saveSession } from "../helpers";

class Login extends Component {
  state = {
    redirect: false,
    username: "",
    password: "",
    errors: {},
    classname: "invisible",
  };

  findUser = () => {
    fetch("http://localhost:3001/login/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => saveSession(data))
      .then(this.setRedirect())
      .catch((err) => console.log(err, "Error"));
  };

  validateLogIn = () => {
    const errors = {};
    let classname = "visible";

    if (this.state.username.trim() === "") {
      errors.username = "Username is required";

      this.setState({ classname });
    }
    if (this.state.password.trim() === "") {
      errors.password = "Password is required";

      this.setState({ classname });
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const errors = this.validateLogIn();
    this.setState({ errors });
    if (errors) return;
    this.findUser();
    this.setState({
      session: this.state.username,
    });
  };

  setRedirect() {
    this.setState({
      redirect: true,
    });
  }

  renderRedirectAfterLogIn() {
    if (this.state.redirect) {
      return <Redirect to={`/home/`} />;
    }
  }

  render() {
    return (
      <Container>
        <div className={this.state.classname}>
          {this.state.errors && (
            <Alert className="alert-danger">{this.state.errors.username}</Alert>
          )}
          {this.state.errors && (
            <Alert className="alert-danger">{this.state.errors.password}</Alert>
          )}
        </div>
        <Form style={{ margin: "50px 0" }}>
          {this.renderRedirectAfterLogIn()}
          <FormGroup row>
            <Label sm={2} size="lg">
              <b>Username</b>
            </Label>
            <Col sm={10}>
              <Input
                type="username"
                name="username"
                placeholder="Username..."
                bsSize="lg"
                onChange={this.handleUsername.bind(this)}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={2} size="lg">
              <b>Password</b>
            </Label>
            <Col sm={10}>
              <Input
                type="password"
                name="password"
                placeholder="Password..."
                bsSize="lg"
                onChange={this.handlePassword.bind(this)}
              />
            </Col>
          </FormGroup>
          <Button
            color="dark"
            size="lg"
            block
            onClick={this.handleLogin.bind(this)}
          >
            Log in
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Login;

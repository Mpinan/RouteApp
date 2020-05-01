import React, { Component } from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { Redirect } from "react-router-dom";

// const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SignUp extends Component {
  state = {
    uid: 0,
    username: "",
    email: "",
    confirm_email: "",
    password: "",
    errors: {},
    redirect: false,
    classname: "invisible",
  };

  validateSignUp = () => {
    const errors = {};
    let classname = "visible";
    if (!this.state.email) {
      errors.email = "Email is required";
      this.setState({ classname });
    }
    if (this.state.email !== this.state.confirm_email) {
      errors.confirm_email = "Email is different";
      this.setState({ classname });
    }
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

  handleLogin = (e) => {
    e.preventDefault();
    const errors = this.validateSignUp();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.newUserAdd(e);
  };

  // Is used to store what the user is typing
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    console.log(this.state.errors === true);
  }

  // Sends a post request to create a new user
  newUserAdd = (e) => {
    e.preventDefault();
    console.log(this.state, "----1");
    fetch("http://localhost:3001/signup/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          email: this.state.email,
          confirm_email: this.state.confirm_email,
          password: this.state.password,
        },
      }),
    })
      .then((response) => response.json())
      .then(this.setRedirect())
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  setRedirect() {
    this.setState({ redirect: true });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
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
          {this.state.errors && (
            <Alert className="alert-danger">{this.state.errors.email}</Alert>
          )}
          {this.state.errors && (
            <Alert className="alert-danger">
              {this.state.errors.confirm_email}
            </Alert>
          )}
        </div>
        <Form
          style={{ margin: "50px 0" }}
          onSubmit={this.handleLogin.bind(this)}
        >
          {this.renderRedirect()}
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              onChange={this.onChange}
              value={this.state.username === null ? "" : this.state.username}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              onChange={this.onChange}
              value={this.state.email === null ? "" : this.state.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirm">Confirm Email</Label>
            <Input
              type="text"
              name="confirm_email"
              id="confirm_email"
              onChange={this.onChange}
              value={
                this.state.confirm_email === null
                  ? ""
                  : this.state.confirm_email
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={this.onChange}
              value={this.state.password === null ? "" : this.state.password}
              errors={this.state.errors}
            />
          </FormGroup>

          <Button color="secondary" size="lg" block>
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SignUp;

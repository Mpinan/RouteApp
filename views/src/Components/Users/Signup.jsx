import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SignUp extends Component {
  state = {
    uid: 0,
    username: "",
    email: "",
    confirm_email: "",
    password: "",
    errors: {}
  };

  validate = () => {
    const errors = {};
    if (!this.state.email) {
      errors.email = "Email is required";
    }
    if (this.state.email !== this.state.confirm_email) {
      errors.confirm_email = "Email is different";
    }
    if (this.state.username.trim() === "") {
      errors.username = "Username is required";
    }
    if (this.state.password.trim() === "") {
      errors.password = "Password is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleLogin = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.newUserAdd(e);
    this.render();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  newUserAdd = e => {
    e.preventDefault();
    console.log(this.state);
    fetch("http://localhost:3001/user", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        confirm_email: this.state.confirm_email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Form onSubmit={this.handleLogin}>
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
              this.state.confirm_email === null ? "" : this.state.confirm_email
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

        <Button>Submit</Button>
      </Form>
    );
  }
}

export default SignUp;

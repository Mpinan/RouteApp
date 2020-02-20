import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class SignUp extends Component {
  state = {
    uid: 0,
    username: "",
    email: "",
    confirm_email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  newUserAdd = e => {
    e.preventDefault();
    console.log(this.state);
    fetch("http://localhost:3001/", {
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
      <Form onSubmit={this.newUserAdd}>
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
            name="confirm"
            id="confirm"
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
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default SignUp;

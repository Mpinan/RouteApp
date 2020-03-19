import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { Redirect } from 'react-router-dom';

class Login extends Component {

  state = {
    redirect: false,
    email: '',
    password: ''
  }


  handlePassword = event => {
    this.setState({
      password: event.target.value
    })
  };

  handleEmail = event => {
    this.setState({
      email: event.target.value
    })
  };

  handleLogin = event => {
    this.setRedirect();
  };

  setRedirect() {
    this.setState({
      redirect: true
    })
  };

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
  };

  render() {
    return (
      <Form style={{ margin: "50px 0" }}>
        {this.renderRedirect()}
        <FormGroup row>
          <Label for="exampleEmail" sm={2} size="lg">
            Email
          </Label>
          <Col sm={10}>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="email"
              bsSize="lg"
              onChange={this.handleEmail.bind(this)}
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
        <Button color="secondary" size="lg" block onClick={this.handleLogin.bind(this)}>
          Log in
        </Button>
      </Form>
    );
  }
};

export default Login;

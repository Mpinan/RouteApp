import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Label, Input } from "reactstrap";

const Login = () => {
  return (
    <Form style={{ margin: "50px 0" }}>
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
          />
        </Col>
      </FormGroup>
      <Button color="secondary" size="lg" block>
        Log in
      </Button>
    </Form>
  );
};

export default Login;

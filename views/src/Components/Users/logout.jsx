import React, { Component } from "react";
import { Container, Button } from "reactstrap";

const LogOut = () => {
  return (
    <Container>
      <b>
        <div className="text-center">
          <h1>YOU HAVE SUCCESFULLY LOG OUT.</h1>
        </div>
      </b>
      <div>
        <div className="text-center">
          <Button href="/home" color="dark">Press to return home</Button>
        </div>
      </div>
    </Container>
  );
};

export default LogOut;

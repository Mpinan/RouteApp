import React, { Component } from "react";
import { Container, Jumbotron, Button } from "reactstrap";

const Home = () => {
  return (
    <Container>
      <div>
        <Jumbotron
          className="col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3"
          style={{
            background: "none",
            justifyContent: "center",
            float: "center",
          }}
        >
          <h1 className="display-3">Hello, routers!</h1>
          <p className="lead">
            Welcome to the RutaPP, a route app to plan your journey!
          </p>
          <hr className="my-2" />
          <p>It is humble, but it is useful.</p>
          <p className="lead">
            <Button color="dark">Learn More</Button>
          </p>
        </Jumbotron>
      </div>
    </Container>
  );
};

export default Home;

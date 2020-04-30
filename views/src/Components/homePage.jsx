import React, { Component } from "react";
import { Container, Jumbotron, Button } from "reactstrap";

const Home = () => {
  return (
    <Container>
      <div>
        <Jumbotron style={{ background: "none" }}>
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

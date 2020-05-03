import React, { Component } from "react";
import { Container, Jumbotron, Button } from "reactstrap";

const Home = () => {
  return (
    <Container>
      <div className="text-center">
        <Jumbotron
          style={{
            background: "none",
            justifyContent: "center",
            float: "center",
          }}
        >
          <div style={{ color: "white" }}>
            <h1 className="display-3">Hello, routers!</h1>
            <p className="lead">
              Welcome to the RutaPP, a route app to plan your journey!
            </p>
            <hr className="my-2" />
            <p>It is humble, but it is useful.</p>
          </div>
          <p className="lead">
            <Button color="dark">Learn More</Button>
          </p>
        </Jumbotron>
      </div>
    </Container>
  );
};

export default Home;

import React, { useState } from "react";
import classnames from "classnames";
import {
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";

const About = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <Container>
      <div>
        <div stlye={{ backgroundColor: "dark" }}>
          <Nav tabs className="nav-fill nav-dark">
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggle("1");
                }}
              >
                How it started
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggle("2");
                }}
              >
                Tech Stack
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div style={{ padding: 20 }}>
                  <b>
                    <h1>How it started</h1>
                    Initially I was just learning how to build a Back-end with
                    Express and a database. I have expirience with PostgreSQL so
                    I chose it to store accounts and routes since a relational
                    database is better for this cases. Reading documentation, I
                    was recommended to use MongoDB but due to some issues with
                    my computer I had to work with PSQL.
                    <p />
                    When my back end was ready and working, I decided to add
                    React and learn how they interact with each other. I found
                    myself learning React and Express at the same time. This was
                    perfect as I love how data interacts with each other in many
                    ways. I wanted to make something with tech I never used
                    before and just convincing myself that I was able to do it.
                    That it was working.
                    <p />
                    Unfortunatly, the app is not tested as it started as a mere
                    practice. Still, I always approach it in the simplest way
                    and break down every single step in order to achieve my
                    goal.
                  </b>
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <div style={{ padding: 20 }}>
                <h1>Tech Stack</h1>
                <p />
                <b>- `React`</b>
                <p />
                <b>- `Express`</b>
                <p />
                <b>- `Bootstrap`</b>
                <p />
                <b>- `PSQL`</b>
              </div>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </Container>
  );
};

export default About;

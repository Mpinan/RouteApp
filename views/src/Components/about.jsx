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
        <div>
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
                <div style={{ padding: 20, color: "white" }}>
                  <b>
                    <h1>How it started</h1>
                    Initially I was just learning how to build a Back-end with
                    Express and a database. Reading documentation, I was
                    recommended to use MongoDB but due to some issues with my
                    computer I had to work with PSQL. I have expirience with
                    PostgreSQL but not using it with Express. Was a lot of fun.
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
              <div style={{ padding: 20, color: "white" }}>
                <h1>Tech Stack</h1>
                <p />
                <b>- React</b>
                <p />
                I have been doing my last projects in react. I felt that I
                wasn't sure enought of this tech so I wanted to keep doing
                projects wtih it.
                <p />
                <b>- Express</b>
                <p />
                It was an experiment for me. As I said before, I was practicing
                a back end with express and once I had it ready and working I
                just kept going with the ideas that came.
                <p />
                <b>- Bootstrap</b>
                <p />
                More specific, reactstrap and MDB, there were easy dependencies
                to implement in the project as it has all the bootstrap classes,
                but as a components. <p />
                <b>- PSQL</b>
                <p />
                As mentioned before, could not set up MongoDB so I tried with
                one that I had experience with, PostgreSQL. Even though the set
                up for JS is different than in Ruby with Sinatra or RoR, I felt
                confident with this database{" "}
              </div>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    </Container>
  );
};

export default About;

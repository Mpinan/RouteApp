import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

const NavBar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const logOut = () => {
    sessionStorage.clear();
    return <Redirect to={`/home`} />;
  };

  const handleButton = () => {
    if (sessionStorage.getItem("username") === null) {
      return (
        <NavItem>
          <NavLink href="/login">
            <b>Log in</b>
          </NavLink>
          <NavLink href="/signup">
            <b>Sign up</b>
          </NavLink>
        </NavItem>
      );
    } else {
      return (
        <NavItem>
          <NavLink href="/profile">
            <b>Profile</b>
          </NavLink>
          <NavLink href="/logout" onClick={logOut}>
            <b>Log out</b>
          </NavLink>
          <NavLink href="/userpage">
            <b>Routing</b>
          </NavLink>
        </NavItem>
      );
    }
  };

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">
          <h2>
            <b>RutaPP</b>
          </h2>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/about">
                <b>About us</b>
              </NavLink>
            </NavItem>

            <Nav navbar>{handleButton()}</Nav>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;

import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const NavBar = props => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  const logOut = () => {
    sessionStorage.clear();
  };

  const handleButton = () => {
    if (sessionStorage.getItem("username") === null) {
      return (
        <NavItem>
          <NavLink href="/login">Log in</NavLink>
          <NavLink href="/signup">Sign up</NavLink>
        </NavItem>
      );
    } else {
      return (
        <NavItem>
          <NavItem>
            <NavLink href="/profile">Profile</NavLink>
          </NavItem>
          <NavLink href="/logout" onClick={logOut}>
            Log out
          </NavLink>
        </NavItem>
      );
    }
  };

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">
          Route App
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/about">About us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contact">Contact us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/userpage">Routing</NavLink>
            </NavItem>

            <Nav navbar>{handleButton()}</Nav>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
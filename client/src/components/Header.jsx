import React from "react";
import {
  Button,
  ButtonGroup,
  Navbar,
  Nav,
} from "react-bootstrap";

function Header() {
    return (
      <header>
        
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/main">Video Game Analysis</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/main">Historical Sales</Nav.Link>
            <Nav.Link href="/projected">Projected Sales</Nav.Link>
          </Nav>
        </Navbar>
      </header>
    );
  }

export default Header;
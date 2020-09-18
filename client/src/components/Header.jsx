import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Axios from "axios";

function Header() {
  // const [status, setStatus] = useState(props.status)
  function logout() {
    Axios.get("http://localhost:5000/logout");
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/main">Video Game Analysis</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/main">Historical Sales</Nav.Link>
          <Nav.Link href="/projected">Projected Sales</Nav.Link>
          <Nav.Link href="/piechart">Market Percent</Nav.Link>
          <Nav.Link href="/" onClick={logout}>
            Log out
          </Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
}

function Checker(props) {
  if (props.status) {
    return <Header />;
  }
  return null;
}

export default Checker;

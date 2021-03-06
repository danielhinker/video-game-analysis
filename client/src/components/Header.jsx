import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import Axios from "axios";
import { BASE_URL } from "../helper";

function Header() {
  function logout() {
    Axios.get(BASE_URL + "logout");
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/index">Video Game Analysis</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/index">Historical Sales</Nav.Link>
          <Nav.Link href="/projected">Projected Sales</Nav.Link>
          <Nav.Link href="/piechart">Market Percent</Nav.Link>
          {/* <Nav.Link href="/" onClick={logout}>
            Log out
          </Nav.Link> */}
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

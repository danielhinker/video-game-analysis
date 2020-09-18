import React from "react"
import {
    Navbar,
  } from "react-bootstrap";

function Footer() {
    const year = new Date().getFullYear();
  
    return (
      <footer>
        <Navbar bg="light" variant="dark" fixed="bottom">
          <p>Daniel Hinker ⓒ {year}</p>
        </Navbar>
      </footer>
    );
  }

  export default Footer
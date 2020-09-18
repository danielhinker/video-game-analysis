import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Route,
  Redirect,
  useHistory
} from "react-router-dom";
import { Button, Form } from "react-bootstrap";

export function Login(props) {
  const [status, setStatus] = useState();
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  function handleChange(event) {
    const { name, value } = event.target;
    setInfo((prevInfo) => {
      return {
        ...prevInfo,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    Axios.get("http://localhost:5000/loggedin").then((res) => {
      if (res.data) {
        setStatus("success");
        props.onChange(true);
        console.log(res.data);
      } else {
        console.log(res.data);
      }
    });
  });

  function handleSubmit(event) {
    Axios.post("http://localhost:5000/signin", info).then((res) => {
      console.log(res);
    });

    setInfo({
      username: "",
      password: "",
    });
  }

  if (status == "success") {
    return (
      <Route>
        <Redirect to="/main"></Redirect>
      </Route>
    );
  }
  return (


    <div>
      <h1>Sign in</h1>
      <div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={handleChange} value={info.username} name="username" type="username" placeholder="Enter username" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
    </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onChange={handleChange} value={info.password} name="password" type="password" placeholder="Password" />
          </Form.Group>

          <Button onClick={handleSubmit} variant="primary" type="submit">
            Submit
  </Button>
        </Form>
      </div>


      <p>{status}</p>
    </div>
  );
}

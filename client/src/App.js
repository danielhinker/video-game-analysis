import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Projected, changeProjectedConfig } from "./components/Projected";
import { Main, changeConfig } from "./components/Main";
import { PieChart, changePieChart } from "./components/PieChart";
import { Spinner, Button, ButtonGroup } from "react-bootstrap";

function Signin(props) {
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
      <input
        onChange={handleChange}
        value={info.username}
        name="username"
        placeholder="username"
      ></input>
      <input
        onChange={handleChange}
        value={info.password}
        name="password"
        placeholder="password"
      ></input>
      <button onClick={handleSubmit}>Submit</button>

      <p>{status}</p>
    </div>
  );
}

function App() {
  const [games, setGames] = useState();
  const [isLoading, setLoading] = useState(true);
  const [config, setConfig] = useState();
  const [projectedConfig, setProjectedConfig] = useState();
  const [pieConfig, setPieConfig] = useState();
  const [status, setStatus] = useState(false);
  const [refresh, setRefresh] = useState();

  function handleChange(newValue) {
    setStatus(newValue);
  }

  useEffect(() => {
    // Axios.get("https://pacific-ocean-02192.herokuapp.com/main")
    Axios.get("http://localhost:3000/main")
      .then((res) => {
        let newConfig = changeConfig(res.data, "globalsales");
        let newProjectedConfig = changeProjectedConfig(res.data, "globalsales");
        let newPieConfig = changePieChart(res.data, "globalsales");
        setPieConfig({ config: newPieConfig });
        setGames({ object: res.data });
        setProjectedConfig({ config: newProjectedConfig });
        setConfig({ config: newConfig });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3000/loggedin").then((res) => {
      setStatus(res.data);
    });
  });

  if (isLoading) {
    return (
      <div>
        <Spinner animation="border" role="status" style={{ margin: "30% 50%" }}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header status={status} />

        <Router>
          <Switch>
            {/* <Router> */}
            <Route exact path="/">
              <Signin onChange={handleChange}></Signin>
            </Route>
            {/* </Router> */}

            <Route path="/piechart">
              <PieChart
                games={games.object}
                config={pieConfig.config}
                status={status}
              ></PieChart>
            </Route>

            <Route exact path="/main">
              <Main
                games={games.object}
                config={config.config}
                status={status}
              ></Main>
            </Route>

            <Route exact path="/projected">
              <Projected
                games={games.object}
                config={projectedConfig.config}
                status={status}
              />
            </Route>

            <Route path="*" component={() => "404 not found"}></Route>
          </Switch>
        </Router>

        <Footer />
      </div>
    );
  }
}
// }

export default App;

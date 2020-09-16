import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Projected, changeProjectedConfig } from "./components/Projected";
import { Main, changeConfig } from "./components/Main";
import { PieChart, changePieChart } from "./components/PieChart";
import {
  Spinner,
  Button,
  ButtonGroup,
} from "react-bootstrap";


function Signin() {

  // const userObject = {
  //   user: '',
  //   password: '';
  // }
  // Axios.post('/signin', )

  return <h1>Sign in</h1>
}

function App() {
  const [games, setGames] = useState();
  const [isLoading, setLoading] = useState(true);
  const [config, setConfig] = useState();
  const [projectedConfig, setProjectedConfig] = useState();
  const [pieConfig, setPieConfig] = useState();

  useEffect(() => {
    Axios.get("http://localhost:5000/main")
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

  if (isLoading) {
    return (
      <div>
      {/* <Header></Header> */}
      <Spinner animation="border" role="status" style={{margin: "30% 50%"}}>
      <span className="sr-only">Loading...</span>
    </Spinner>
    {/* <Footer></Footer> */}
    </div>
    );
  } else {
    return (
      <div className="App">
        <Header />

        <Router>
          <Switch>
          <Route path="/piechart">
            <PieChart games={games.object} config={pieConfig.config}></PieChart>
          </Route>
          <Route path="/signin">
            <Signin></Signin>
            </Route>
            <Route path="/main">
              <Main games={games.object} config={config.config}></Main>
            </Route>
            <Route path="/projected">
              <Projected games={games.object} config={projectedConfig.config} />
            </Route>
            <Route path="/">
              <Redirect to="/signin"></Redirect>
            </Route>
          </Switch>
        </Router>

        <Footer />
      </div>
    );
  }
}

export default App;

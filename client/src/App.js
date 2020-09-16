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

function App() {
  const [games, setGames] = useState();
  const [isLoading, setLoading] = useState(true);
  const [config, setConfig] = useState();
  const [projectedConfig, setProjectedConfig] = useState();

  useEffect(() => {
    Axios.get("http://localhost:5000/")
      .then((res) => {
        let newConfig = changeConfig(res.data, "globalsales");
        let newProjectedConfig = changeProjectedConfig(res.data, "globalsales");
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
    return <div>Loading</div>;
  } else {
    return (
      <div className="App">
        <Header />

        <Router>
          <Switch>
            <Route path="/main">
              <Main games={games.object} config={config.config}></Main>
            </Route>
            <Route path="/projected">
              <Projected games={games.object} config={projectedConfig.config} />
            </Route>
            <Route path="/">
              <Redirect to="/main"></Redirect>
            </Route>
          </Switch>
        </Router>

        <Footer />
      </div>
    );
  }
}

export default App;

import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { JSCharting } from "jscharting-react";
import { config, divStyle } from "../helper";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

function changeConfig(games, type) {
  let object = JSON.stringify(games);
  let parsedObject = JSON.parse(object);

  config.series[0].points.map((e) => {
    e.y =
      parseFloat(parsedObject.json[e.name][type].totalsales) /
      parsedObject.json[e.name].count;
  });
  return config;
}

function Main(props) {
  const [status, setStatus] = useState(props.status);
  const [graph, setGraph] = useState({ config: props.config });
  const [games, setGames] = useState({ object: props.games });

  function handleNa() {
    let newConfig = changeConfig(games.object, "nasales");
    setGraph({ config: newConfig });
  }

  function handleEu() {
    let newConfig = changeConfig(games.object, "eusales");
    setGraph({ config: newConfig });
  }

  function handleJp() {
    let newConfig = changeConfig(games.object, "jpsales");
    setGraph({ config: newConfig });
  }

  function handleGlobal() {
    let newConfig = changeConfig(games.object, "globalsales");
    setGraph({ config: newConfig });
  }

  if (!status) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div>
    <h1 style={{margin: "50px 0"}}>Average Sales in Millions</h1>
      <div style={divStyle}>
        <JSCharting options={graph.config} />
      </div>

      <ButtonGroup aria-label="Basic example" style={{ margin: "50px" }}>
        <Button variant="secondary" onClick={handleNa}>
          NA Sales
        </Button>
        <Button variant="secondary" onClick={handleEu}>
          EU Sales
        </Button>
        <Button variant="secondary" onClick={handleJp}>
          JP Sales
        </Button>
        <Button variant="secondary" onClick={handleGlobal}>
          Global Sales
        </Button>
      </ButtonGroup>
    </div>
  );
}

export { Main, changeConfig };

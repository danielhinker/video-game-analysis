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
import { JSCharting } from "jscharting-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Projected, changeProjectedConfig } from "./components/Projected";
import { Main, changeConfig } from "./components/Main";
import {
  Spinner,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { divStyle } from "./helper"



var pieChart = { 
  debug: true, 
  title_position: 'center', 
  legend: { 
    template: 
      '%value {%percentOfTotal:n1}% %icon %name', 
    position: 'inside left bottom'
  }, 
  defaultSeries: { 
    type: 'pie', 
    pointSelection: true
  }, 
  defaultPoint_label_text: '<b>%name</b>', 
  title_label_text: 'Average Sales by Genre', 
  yAxis: { label_text: 'Sales', formatString: 'n' }, 
  series: [ 
    { 
      name: 'Genres', 
      points: [ 
        { name: "Sports", y: 30 },
        { name: "Platform", y: 30 },
        { name: "Racing", y: 30 },
        { name: "Misc", y: 30 },
        { name: "Shooter", y: 30 },
        { name: "Role-Playing", y: 30.15 },
        { name: "Puzzle", y: 118 },
        { name: "Simulation", y: 136 },
        { name: "Action", y: 130 },
        { name: "Fighting", y: 136 },
        { name: "Adventure", y: 136 },
        { name: "Strategy", y: 136 },
      ] 
    } 
  ] 
}; 

function changePieChart(games, type) {
  let object = JSON.stringify(games)
  let parsedObject = JSON.parse(object)
  pieChart.series[0].points.map((e)=>{
    e.y = parseFloat(parsedObject.json[e.name][type].totalsales) / parsedObject.json[e.name].count
  })
  return pieChart
}

function PieChart(props) {
  const [chart, setChart] = useState({ config: props.config })
  const [games, setGames] = useState({ object: props.games })

  function handleNa() {
    let newConfig = changePieChart(games.object, "nasales");
    setChart({config: newConfig}) 
  }

  function handleEu() {
    let newConfig = changePieChart(games.object, "eusales");
    setChart({config: newConfig})
  }

  function handleJp() {
    let newConfig = changePieChart(games.object, "jpsales");
    setChart({config: newConfig})
  }

  function handleGlobal() {
    let newConfig = changePieChart(games.object, "globalsales");
    setChart({config: newConfig})
  }

  return (
    <div>
      <div style={divStyle}>
        
        <JSCharting options={chart.config} />  
        {/* <JSCharting options={chart} />   */}
      
    </div>

    <ButtonGroup aria-label="Basic example" style={{ margin: "50px" }}>
      <Button variant="secondary" onClick={handleNa}>NA Sales</Button>
      <Button variant="secondary" onClick={handleEu}>EU Sales</Button>
      <Button variant="secondary" onClick={handleJp}>JP Sales</Button>
      <Button variant="secondary" onClick={handleGlobal}>Global Sales</Button>
    </ButtonGroup>
    </div>
  )
}

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
    Axios.get("http://localhost:5000/")
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
              {/* <Main games={games.object} config={config.config}></Main> */}
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

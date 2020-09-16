import React, { useState, useEffect } from "react";


import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Axios from "axios";

import { JSCharting } from "jscharting-react";
import {
  Button,
  ButtonGroup,
  Navbar,
  Nav,
} from "react-bootstrap";

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
// import { updatedObject } from "../../helper";

let gamesObject = {};

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



function Main(props) {
  const [graph, setGraph] = useState({ config: props.config})

  function handleNa() {
    
    let newConfig = changeConfig(gamesObject, "nasales");
    setGraph({config: newConfig})
    
  }

  function handleEu() {
    let newConfig = changeConfig(gamesObject, "eusales");
    setGraph({config: newConfig})
  }

  function handleJp() {
    let newConfig = changeConfig(gamesObject, "jpsales");
    setGraph({config: newConfig})
  }

  function handleGlobal() {
    let newConfig = changeConfig(gamesObject, "globalsales");
    setGraph({config: newConfig})
  }

  return (
    <div>
      <div style={divStyle}>
      
          <JSCharting options={graph.config} />  
          {/* <JSCharting options={chart} />   */}
        
      </div>

      <ButtonGroup aria-label="Basic example" style={{ margin: "50px" }}>
        <Button variant="secondary" onClick={handleNa}>NA Sales</Button>
        <Button variant="secondary" onClick={handleEu}>EU Sales</Button>
        <Button variant="secondary" onClick={handleJp}>JP Sales</Button>
        <Button variant="secondary" onClick={handleGlobal}>Global Sales</Button>
      </ButtonGroup>
    </div>
  );
}

function Projected(props) {
  const [graph, setGraph] = useState({ config: props.config})

  function handleNa() {
    let newConfig = changeProjectedConfig(gamesObject, "nasales");
    setGraph({config: newConfig})
  }

  function handleEu() {
    let newConfig = changeProjectedConfig(gamesObject, "eusales");
    setGraph({config: newConfig})
  }


  function handleJp() {
    let newConfig = changeProjectedConfig(gamesObject, "jpsales");
    setGraph({config: newConfig})
  }

  function handleGlobal() {
    let newConfig = changeProjectedConfig(gamesObject, "globalsales");
    setGraph({config: newConfig})
  }

  return (
    <div>
      <div style={divStyle}>
      
          {/* <JSCharting options={graph.config} />   */}
          <JSCharting options={graph.config} />  
        
      </div>

     <ButtonGroup aria-label="Basic example" style={{ margin: "50px" }}>
      <Button variant="secondary" onClick={handleNa}>NA Sales</Button>
         <Button variant="secondary" onClick={handleEu}>EU Sales</Button>
         <Button variant="secondary" onClick={handleJp}>JP Sales</Button>
         <Button variant="secondary" onClick={handleGlobal}>Global Sales</Button>
       </ButtonGroup> 
 </div>
  );
}

let projectedChart = {
  debug: true,
  type: 'columnSubtle',
  xAxis: { label_text: 'Genre'  },
  yAxis: {
    label_text: 'Average Sales in Millions',
    defaultTick_label_text: '%value'
  },
  defaultPoint: {
    // tooltip: '<b>%name</b> <br/> Average: %yValue<br/> Highest: %yMax<br/> Lowest: %ymin',
    subvalue_line_width: 2
  },
  legend_visible: false,
  title: {
    label_text: 'Estimated Sales [Best: %maxPointName %ymax, Worst: %minPointName %ymin]'
  },
  series: [
    {
      name: 'Score Estimates',
      points: {
        mapTo: 'name,y,subvalue.range',
        data: [
          ['Sports',50,[  30,  70] ],
          ['Platform',50,[  30,  70] ],
          ['Racing',50,[  30,  70] ],
          ['Misc',50,[  30,  70] ],
          ['Shooter',50,[  30,  70] ],
          ['Role-Playing',50,[  30,  70] ],
          ['Puzzle',50,[  30,  70] ],
          ['Simulation',50,[  30,  70] ],
          ['Action',50,[  30,  70] ],
          ['Fighting',50,[  30,  70] ],
          ['Adventure',50,[  30,  70] ],
          ['Strategy',50,[  30,  70] ],
        ]
      }
    }]}; 

let config = {
  debug: true,
  defaultSeries_type: "column",
  legend_visible: false,
  defaultPoint_label_visible: true,
  yAxis_visible: false,
  xAxis_defaultTick: {
    placement: "inside",
    label_style: {
      color: "#fff",
      fontWeight: "bold",
    },
  },
  series: [
    {
      name: "Genres",
      palette: "default",
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
      ],
    },
  ],
};

const divStyle = {
  maxWidth: "1200px",
  height: "500px",
  margin: "40px auto 10px",
};

function changeConfig(games, type) {
  let object = JSON.stringify(games)
  let parsedObject = JSON.parse(object)
  
  config.series[0].points.map((e)=>{
    e.y = parseFloat(parsedObject.json[e.name][type].totalsales) / parsedObject.json[e.name].count
  })
  return config;
}

function changeProjectedConfig(games, type) {
  let object = JSON.stringify(games)
  let parsedObject = JSON.parse(object)
  
  
  projectedChart.series[0].points.data.map((e)=>{

    e[1] = parseFloat(parsedObject.json[e[0]][type].totalsales) / parsedObject.json[e[0]].count
    e[2][0] = parseFloat(parsedObject.json[e[0]][type].lowest)
    e[2][1] = parseFloat(parsedObject.json[e[0]][type].highest)
    
    
  })
  return projectedChart

}

function Default() {
  return <Redirect to="/main"></Redirect>
}

let globalCount = 0
function App() {
  const [games, setGames] = useState();
  const [isLoading, setLoading] = useState(true);
  const [config, setConfig] = useState()
  const [projectedConfig, setProjectedConfig] = useState()


  useEffect(() => {
    Axios.get("http://localhost:5000/")
      .then((res) => {
        
        setGames(res.data);
        let newConfig = changeConfig(res.data, "globalsales");
        gamesObject = res.data;
        let newProjectedConfig = changeProjectedConfig(res.data, "globalsales")
        setProjectedConfig({config: newProjectedConfig})
        setConfig({config: newConfig})
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    
  }, []);
 
  if (isLoading) {
    return <div>Loading</div>
  } else {

  return (
    <div className="App">
      <Header />

      <Router>
        <Switch>
          
          <Route  path="/main">
            <Main games={games} config={config.config} ></Main>
          </Route>
          <Route path="/projected">
            <Projected games={games} config={projectedConfig.config} />
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

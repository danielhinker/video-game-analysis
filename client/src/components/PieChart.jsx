import React, { useState } from "react"
import { JSCharting } from "jscharting-react";
import {
    Button,
    ButtonGroup,
  } from "react-bootstrap";
import { pieChart, divStyle } from "../helper"


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
  
export { PieChart, changePieChart }
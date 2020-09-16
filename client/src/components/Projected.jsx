import React, { useState } from "react"
import {
    Button,
    ButtonGroup,
  } from "react-bootstrap";
import { JSCharting } from "jscharting-react";
import { projectedChart, divStyle }  from "../helper"


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
  

function Projected(props) {
    const [graph, setGraph] = useState({ config: props.config})
    const [games, setGames] = useState({ object: props.games})
  
    function handleNa() {
      let newConfig = changeProjectedConfig(games.object, "nasales");
      setGraph({config: newConfig})
    }
  
    function handleEu() {
      let newConfig = changeProjectedConfig(games.object, "eusales");
      setGraph({config: newConfig})
    }
  
  
    function handleJp() {
      let newConfig = changeProjectedConfig(games.object, "jpsales");
      setGraph({config: newConfig})
    }
  
    function handleGlobal() {
      let newConfig = changeProjectedConfig(games.object, "globalsales");
      setGraph({config: newConfig})
    }
  
    return (
      <div>
        <div style={divStyle}>
        
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


  export {Projected, changeProjectedConfig};
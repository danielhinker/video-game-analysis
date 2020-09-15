const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");

const mongoose = require('mongoose');
const papa = require('papaparse')
// const cors = require("cors")
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser')

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.use(express.static("public"));


var data = []

function firstFunction() {
  return new Promise((resolve, reject) => {

  
fs.createReadStream('client/public/small_vgsales.csv')
.pipe(csv())
.on('data', function (row) {
  // if (row.Rank == 1) {
  data.push(row)
  // resolve(data)
  // console.log(row)
})
.on('end', function () {
  // console.log('Data loaded')
  // console.log(data)
  resolve(data)
})


})
}

mongoose.connect("mongodb://localhost:27017/salesDB", { useNewUrlParser: true, useUnifiedTopology: true });

const gameSchema = new mongoose.Schema({
  rank: String,
  name: String,
  platform: String,
  year: String,
  genre: String,
  publisher: String,
  nasales: String,
  eusales: String,
  jpsales: String,
  othersales: String,
  globalsales: String
});

const Game = mongoose.model("Game", gameSchema);

async function secondFunction() {
  console.log("before")
  let result = await firstFunction()
  console.log(typeof result[0].Rank)
  console.log("after")
  
  // console.log(data)
}


// const gamesList;
let gamesList;

    
app.get("/get/", (req, res) => {

  

  Game.find({}, function(err, foundGames) {
    console.log(foundGames)
    let series = [
      {
        name: 'Team', 
        palette: 'default', 
        points: [ 
          { name: 'Sports', y: 15.15 }, 
          { name: 'Platform', y: 118 }, 
          { name: 'Racing', y: 136 }, 
          { name: 'Misc', y: 130 }, 
          { name: 'Shooter', y: 123 } 
        ] 
      }
    ]
    // gamesList = foundGames;
    
    // console.log(foundGames)
    // console.log(foundGames)

      // res.send({ gamesList: foundGames[0].name});



  })
})


app.get("/", (req, res) => {

  // res.send({message:"We did it!"})
  Game.find({}, function(err, foundGames) {
    // gamesList = foundGames;
    let totalSales = 0;
    let salesObject = [ 
      { name: 'Sports', y: 0, count: 0 }, 
      { name: 'Platform', y: 0, count: 0 }, 
      { name: 'Racing', y: 0, count: 0 }, 
      { name: 'Misc', y: 0, count: 0 }, 
      { name: 'Shooter', y: 0, count: 0 } 
    ] 

    let updatedObject = {
      'Sports': {y: 0, count: 0},
      'Platform': {y: 0, count: 0},
      'Racing': {y: 0, count: 0},
      'Misc': {y: 0, count: 0},
      'Shooter': {y: 0, count: 0},
    }

    foundGames.map(e=>{
      switch (e.genre) {
        case 'Sports':
          if (updatedObject[e.genre].count != 100) {
            updatedObject[e.genre].y += parseInt(e.globalsales)
            updatedObject[e.genre].count += 1
          }
          break;
        case 'Platform':
          if (updatedObject[e.genre].count != 100) {
          updatedObject[e.genre].y += parseInt(e.globalsales)
          updatedObject[e.genre].count += 1
          }
          break;
        case 'Racing':
          if (updatedObject[e.genre].count != 100) {
          updatedObject[e.genre].y += parseInt(e.globalsales)
          updatedObject[e.genre].count += 1
          }
          break;
        case 'Misc':
          if (updatedObject[e.genre].count != 100) {
          updatedObject[e.genre].y += parseInt(e.globalsales)
          updatedObject[e.genre].count += 1
          }
          break;
        case 'Shooter':
          if (updatedObject[e.genre].count != 100) {
          updatedObject[e.genre].y += parseInt(e.globalsales)
          updatedObject[e.genre].count += 1
          }
          break;

        default:
      }
      

      // if (e.genre == 'Sports') {
      // es
      // console.log(totalSales)
    // } else if (e.genre == 'Platform/') {

    // }
    });
    console.log(salesObject[0].y)
    // console.log(foundGames[1].globalsales)
    // console.log(foundGames)
      res.send({ message: "We did it!", gamesList: foundGames[0].name, sports: updatedObject.Sports.y,
    platform: updatedObject.Platform.y, racing: updatedObject.Racing.y, misc: updatedObject.Misc.y,
    shooter: updatedObject.Shooter.y });
    if (foundGames.length === 0) {
        secondFunction();
        console.log("no games")
        
        data.map((game)=>{
            const game1 = new Game({
                rank: game.Rank,
                name: game.Name,
                platform: game.Platform,
                year: game.Year,
                genre: game.Genre,
                publisher: game.Publisher,
                nasales: game.NA_Sales,
                eusales: game.EU_Sales,
                jpsales: game.JP_Sales,
                othersales: game.Other_Sales,
                globalsales: game.Global_Sales
            });
            game1.save()
  
        })
      }}).then((data)=>{
        
      });
  
  // secondFunction()
  // console.log(gamesList)
  
});

const express = require("express"),
  app = express(),
  port = process.env.PORT || 5000,
  cors = require("cors");

const mongoose = require("mongoose");
const papa = require("papaparse");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { default: Axios } = require("axios");
const helperObject = require("./helper.js");

let updatedObject = helperObject.updatedObject;

app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.use(express.static("public"));

var data = [];

function firstFunction() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("client/public/vgsales.csv")
      .pipe(csv())
      .on("data", function (row) {
        if (data.length < 15000) {
          data.push(row);
        }
      })
      .on("end", function () {
        resolve(data);
      });
  });
}

mongoose.connect("mongodb://localhost:27017/salesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
  globalsales: String,
});

const Game = mongoose.model("Game", gameSchema);

const userSchema = new mongoose.Schema({
  user: String,
  password: String
})

const User = mongoose.model("User", userSchema)



async function secondFunction() {
  let result = await firstFunction();
}

function addSales(foundGames) {
  return new Promise((resolve, reject) => {
    foundGames.map((e) => {
      if (updatedObject[e.genre].count < 500) {
        updatedObject[e.genre].globalsales.totalsales += parseFloat(
          e.globalsales
        );
        if (
          parseFloat(e.globalsales) > updatedObject[e.genre].globalsales.highest
        ) {
          updatedObject[e.genre].globalsales.highest = parseFloat(
            e.globalsales
          );
        }
        if (parseFloat(e.nasales) > updatedObject[e.genre].nasales.highest) {
          updatedObject[e.genre].nasales.highest = parseFloat(e.nasales);
        }
        if (parseFloat(e.eusales) > updatedObject[e.genre].eusales.highest) {
          updatedObject[e.genre].eusales.highest = parseFloat(e.eusales);
        }
        if (parseFloat(e.jpsales) > updatedObject[e.genre].jpsales.highest) {
          updatedObject[e.genre].jpsales.highest = parseFloat(e.jpsales);
        }

        if (
          parseFloat(e.globalsales) < updatedObject[e.genre].globalsales.lowest
        ) {
          updatedObject[e.genre].globalsales.lowest = parseFloat(e.globalsales);
        }
        if (parseFloat(e.nasales) < updatedObject[e.genre].nasales.lowest) {
          updatedObject[e.genre].nasales.lowest = parseFloat(e.nasales);
        }
        if (parseFloat(e.eusales) < updatedObject[e.genre].eusales.lowest) {
          updatedObject[e.genre].eusales.lowest = parseFloat(e.eusales);
        }
        if (parseFloat(e.jpsales) < updatedObject[e.genre].jpsales.lowest) {
          updatedObject[e.genre].jpsales.lowest = parseFloat(e.jpsales);
        }

        updatedObject[e.genre].nasales.totalsales += parseFloat(e.nasales);
        updatedObject[e.genre].eusales.totalsales += parseFloat(e.eusales);
        updatedObject[e.genre].jpsales.totalsales += parseFloat(e.jpsales);
        updatedObject[e.genre].count += 1;
      }
    });
    if (foundGames.length > 50) {
      // console.log(updatedObject)
      resolve("success");
    } else {
      reject("fail");
    }
  });
}

// app.post("/signin", (req, res) => {
//   res.send("hello")
// });

app.get("/", (req, res) => {
  res.redirect("/main");
});

app.get("/main", async (req, res) => {
  var myPromise = () => {
    return new Promise((resolve, reject) => {
      Game.find({}, function (err, foundGames) {
        if (foundGames.length < 5000) {
          secondFunction();

          data.map((game) => {
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
              globalsales: game.Global_Sales,
            });
            game1.save();
          });
          res.redirect("/main");
        } else {
          if (!err) {
            resolve(foundGames);
            // res.redirect('/main')
          } else {
            reject("fail");
          }
        }
      });
    });
  };

  var callMyPromise = async () => {
    var result = await myPromise();
    return result;
  };

  callMyPromise()
    .then((result2) => {
      var data1 = addSales(result2);
      return data1;
    })
    .then((result) => {
      res.send({
        json: updatedObject,
      });
    });
});

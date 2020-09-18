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

let info = {
  db: process.env.db,
  username: process.env.username,
  password: process.env.password,
};


app.use(cors());
app.listen(port, () => console.log("Backend server live on " + port));

app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

var data = [];

function firstFunction() {
  return new Promise((resolve, reject) => {
    fs.createReadStream("client/public/vgsales.csv")
      .pipe(csv())
      .on("data", function (row) {
        // if (data.length < 15000) {
          data.push(row);
        // }
      })
      .on("end", function () {
        resolve(data);
      });
  });
}

// mongoose.connect("mongodb://localhost:27017/salesDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect("mongodb+srv://" + info.username + ":" + info.password + "@cluster0.memc3.mongodb.net/" + info.db + "?retryWrites=true&w=majority", {
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
  password: String,
});

const User = mongoose.model("User", userSchema);

async function secondFunction() {
  let result = await firstFunction();
}

function checkMax(game, type) {
  if (parseFloat(game[type]) > updatedObject[game.genre][type].highest) {
    updatedObject[game.genre][type].highest = parseFloat(game[type]);
  }
}

function checkMin(game, type) {
  if (parseFloat(game[type]) < updatedObject[game.genre][type].lowest) {
    updatedObject[game.genre][type].lowest = parseFloat(game[type]);
  }
}

function addSales(foundGames) {
  return new Promise((resolve, reject) => {
    foundGames.map((e) => {
      if (updatedObject[e.genre].count < 400) {
        updatedObject[e.genre].globalsales.totalsales += parseFloat(
          e.globalsales
        );
        let type = ["globalsales", "nasales", "eusales", "jpsales"];
        type.map((type) => {
          checkMax(e, type);
          checkMin(e, type);
        });

        updatedObject[e.genre].nasales.totalsales += parseFloat(e.nasales);
        updatedObject[e.genre].eusales.totalsales += parseFloat(e.eusales);
        updatedObject[e.genre].jpsales.totalsales += parseFloat(e.jpsales);
        updatedObject[e.genre].count += 1;
      }
    });
    if (foundGames.length > 50) {
      resolve("success");
    } else {
      reject("fail");
    }
  });
}

let isAuthenticated = false;

app.get("/loggedin", (req, res) => {
  res.send(isAuthenticated);
});

app.get("/logout", (req, res) => {
  isAuthenticated = false;
  res.send("successfully logged out");
});

app.post("/signin", (req, res) => {
  console.log(req.body);
  if (req.body.username == "admin" && req.body.password == "admin") {
    isAuthenticated = true;
    res.send("success");
  } else {
    res.send("fail");
  }
});

app.get("/", (req, res) => {
  res.redirect("/main");
});

app.get("/main", async (req, res) => {
  await secondFunction();
  var myPromise = () => {
    return new Promise((resolve, reject) => {
      
      Game.find({}, function (err, foundGames) {
        console.log(foundGames.length)
        
        if (foundGames.length < 500) {

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
    .then(() => {
      res.send({
        json: updatedObject,
      });
    });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

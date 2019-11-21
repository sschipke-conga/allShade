const http = require("http");
const url = require("url");
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 3000);

// DB Setup
const environment = process.env.NODE_ENV || "development";
const configuration = require("./knexfile")[environment];
const database = require("knex")(configuration);

app.locals.title = 'No B No Shade'

app.get("/api/v1/queens", (request, response) => {
  database('queens').select()
  .then((queens) => {
    response.status(200).json(queens);
  })
  .catch(error => response.status(500).json(error))
});

app.get("/api/v1/queens/:id", (request, response) => {
  const { id } = request.params;
  const targetQueen = app.locals.queens.find(queen => queen.id === parseInt(id));
  if (!targetQueen) {
    return response.status(404).json("This queen is MIA");
  }
  response.status(200).json(targetQueen);
});

app.get("/api/v1/seasons", (request, response) => {
  const { seasons } = app.locals;
  response.json(seasons);
});



app.get("/api/v1/seasons/:id", (request, response) => {
  const { id } = request.params;
  const targetSeason = app.locals.seasons.find(
    season => season.id === parseInt(id)
  );
  if (!targetSeason) {
    return response.status(404).json("This season is MIA");
  }
  response.status(200).json(targetSeason);
});


app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}. The library is open!`
  );
});

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
  database('queens')
    .where({ queen_id: id })
    .then(queen => {
      if (queen.length === 0) {
        response.status(404).json(`This queen is MIA, no queen with ${id} was found`)
      }
      response.status(200).json(queen[0])
    }
    )
    .catch(error => response.status(500).json(error))
  });
  
  app.post('/api/v1/queens', (request, response) => {
    const queen = request.body;
    queen.season_id = queen.season;
  for (let requiredParameter of ['name', 'winner', 'miss_congeniality', 'season', 'quote']) {
    if (queen[requiredParameter] === undefined) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, winner: <boolean>, miss_congeniality: <boolean>, season: <integer>, quote:<string>,   }. You're missing a '${requiredParameter}' property.` });
    }
  }

  database('queens').insert(queen, 'queen_id')
    .then(queenId => {
      response.status(201).json({queen_id: queenId[0], ...queen })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/seasons", (request, response) => {
  database('seasons').select()
    .then((seasons) => {
      response.status(200).json(seasons);
    })
    .catch(error => response.status(500).json(error))
});

app.post('/api/v1/seasons', (request, response) => {
  const season = request.body;
  console.log(season)
  for (let requiredParameter of ['number', 'winner', 'image_url']) {
    if (!season[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { number: <integer>, winner: <string>, image_url: <string>,}. You're missing a '${requiredParameter}' property.` });
    }
  }
  database('seasons').insert(season, 'id')
    .then(seasonId => {
      response.status(201).json({ id: seasonId[0], ...season })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get("/api/v1/seasons", (request, response) => {
  database('seasons').select()
    .then((seasons) => {
      response.status(200).json(seasons);
    })
    .catch(error => response.status(500).json(error))
});



app.get("/api/v1/seasons/:id", (request, response) => {
  const { id } = request.params;
  database('seasons')
    .where({ number: id })
    .then(season => {
      if (season.length === 0) {
        response.status(404).json(`No season no shade! Season number ${id} does not exist`)
      }
      response.status(200).json(season[0])
    }
    )
    .catch(error => response.status(500).json(error))
});


app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}. The library is open!`
  );
});

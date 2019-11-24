// This tells the server to use http and allows easy use of http requests, esp bodies and headers
const http = require("http");
// this helps with parsing of URLs
const url = require("url");
//import Express
const express = require("express");
// Set up the server as "app" using a built-in functin in Express
const app = express();
//import cors
const cors = require('cors');
// Tells our app to use CORS protocols (for security)
app.use(cors());
// Tells our server to parse incoming request bodies as JSON
app.use(express.json());
// Sets the port of our server using the environment, if none is found sets it to 3000
app.set("port", process.env.PORT || 3000);

// DB Setup
// Helps our app determine what environment it's in, if none is found the default is 'dev'
const environment = process.env.NODE_ENV || "development";
// Configs our knexfile based on the environment
const configuration = require("./knexfile")[environment];
// Tells Knex how to configure our database based on the environment
const database = require("knex")(configuration);
// Set the title of our help
app.locals.title = 'No B No Shade'

// Sets an endpoing for a "GET" request at the root url + api/v1/queens
app.get("/api/v1/queens", (request, response) => {
  // query the 'queens' table in the database and select every row
  database('queens').select()
  .then((queens) => {
    // JSON the found data, send in via HTTP with a status code of 200 (success)
    response.status(200).json(queens);
  })
  // if an error occurs, send an HTTP response with a staus of 500 (internal server error)
  .catch(error => response.status(500).json(error))
});

// Sets an endpoing for a "GET" request at the root url + api/v1/queens/:id to get a specific queen
app.get("/api/v1/queens/:id", (request, response) => {
  // deconstructs the id from the URL string using the params property of the request
  const { id } = request.params;
  // query the database
  database('queens')
  // find the the queen that matches the id that was passed in the URL via the request
    .where({ queen_id: id })
    // Take the result of the query (which is an array)
    .then(queen => {
      // if the array is empty aka no matching data was found
      if (queen.length === 0) {
        // send a response with a status code of 404 (not found) and the message
        response.status(404).json(`This queen is MIA, no queen with ${id} was found`)
      }
      // otherwise, return a response with a status code of 200 and the stringified data for that queen
      response.status(200).json(queen[0])
    }
    )
    // if an error occurs, send the error with a response code of 500
    .catch(error => response.status(500).json(error))
  });
  
  // Sets a 'POST' endpoint for adding a new queen
  app.post('/api/v1/queens', (request, response) => {
  // here the app is extracting the queen object from the body of the request
    const queen = request.body;
  // in this case, the season number is the same as its id, so we had that to our object
    queen.season_id = queen.season;
    // we make a list of required parameters and loop through our object and check them
  for (let requiredParameter of ['name', 'winner', 'miss_congeniality', 'season', 'quote']) {
    // if one of the parameters is empty/undefined we go to the if block, undefined was chosen sine some of the parameters are booleans and could be false
    if (queen[requiredParameter] === undefined) {
      // if a required parameter is undefined, send back a response with a status code of 422 and tell the user which parameter they are missing
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, winner: <boolean>, miss_congeniality: <boolean>, season: <integer>, quote:<string>,   }. You're missing a '${requiredParameter}' property.` });
    }
  }
  // once we've checked that all the parameters are present we then insert the object into the database
  // we wait for the database to give us the unique queen_id in an array
  database('queens').insert(queen, 'queen_id')
  // when we get the unique queen_id back, we send a response with a code of 201
  // and we show the user the entire object that they have inserted with the new queen_id included
    .then(queenId => {
      response.status(201).json({queen_id: queenId[0], ...queen })
    })
    // if an error occurs send a response with a status code of 500 and the error
    .catch(error => {
      response.status(500).json({ error });
    });
});

// creating a 'GET' endpoint for all the seasons
app.get("/api/v1/seasons", (request, response) => {
// query the 'seasons' table in the database and get all the entries
  database('seasons').select()
    .then((seasons) => {
  // send the result (all the seasons) in a response with a 200 status code
      response.status(200).json(seasons);
    })
  // as always, if something goes wrong send a response with status code 500 and the error
    .catch(error => response.status(500).json(error))
});

// this creates a "POST" endpoint for adding a season to the database
app.post('/api/v1/seasons', (request, response) => {
// parse and extract the target season object from the body of the response
  const season = request.body;
// once again loop through the object, checking for the required parameters/properties
  for (let requiredParameter of ['number', 'winner', 'image_url']) {
    // if one of the required parameters is missing (none of these are booleans), enter the if block
    if (!season[requiredParameter]) {
    // return a response with a code of 422 and message stating which parameter is missing
      return response
        .status(422)
        .send({ error: `Expected format: { number: <integer>, winner: <string>, image_url: <string>,}. You're missing a '${requiredParameter}' property.` });
    }
  }

  // otherwise the season is iserted into the database, and the id is generated and returned
  database('seasons').insert(season, 'id')
  // once the it is returned
    .then(seasonId => {
  //send a response with status 201 and show the user the object that was inserted along with its unique id
      response.status(201).json({ id: seasonId[0], ...season })
    })
    // oops, 500 status error if something goes wrong
    .catch(error => {
      response.status(500).json({ error });
    });
});

// this creates a 'GET' endpoint for a specific season based on its id
app.get("/api/v1/seasons/:id", (request, response) => {
// using the URL, parse the id number from the params property of the request 
  const { id } = request.params;
// query the database
  database('seasons')
// find where the season number matches what was passed in for the id (in this case, they match)
    .where({ number: id })
// once that is returned we move one with the result (which is an array)
    .then(season => {
  // if the result/array is empty
      if (season.length === 0) {
  // send a 404 response and let the user know that no season with that number exists
        response.status(404).json(`No season no shade! Season number ${id} does not exist`)
      }
  // otherwise send a response with a 200 status code and the found season object
      response.status(200).json(season[0])
    }
    )
  // as per usual
    .catch(error => response.status(500).json(error))
});

// this sets up a "DELETE" endpoint for removing a queen from the database using their id
app.delete('/api/v1/queens/:id', (request, response) => {
// once again, the id number is parsed from the params property of the request
  const {id} = request.params;
  // query the 'queens' table of the database
  database('queens')
// find the entry where the queen_id matches the number passed in the URL
    .where({ queen_id: id})
// delete the found entry from the database
    .del()
// this returns a response of how many items were deleted
    .then(res => {
  // if no items were deleted
      if(res === 0) {
  // let the user know that their request was incorrect, no such queen exists/existed in the database
        return response.status(404).json(`Queen with queen_id: ${id} does not exist.`)
      }
  // otherwise, send a response with status code 200 and let the user know their request was successful 
      response.status(200).json(`Queen with queen_id of ${id} successfully deleted`)
    })
  // know this one by heart
    .catch(err => {
      response.status(500).json(err)
    })
})

// this tells the app to listen at the port which is determined based on the environment, this tells the server to run/be prepared to handle requests
app.listen(app.get("port"), () => {
// if an applicable 'console' or environment is available, the following statement prints in order to signal that the server is running correctly and which port it is running on
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}. The library is open!`
  );
});

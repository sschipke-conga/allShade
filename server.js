const http = require("http");
const url = require("url");
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.set("port", process.env.PORT || 3000);

app.locals.title = 'No B No Shade'
app.locals.queens = [
  {
  "id": 1,
  "name": "Victoria 'Porkchop' Parker",
  "winner": false,
  "missCongeniality": false,
  "image_url": "http://www.nokeynoshade.party/images/victoria-porkchop-parker.jpg",
  "quote": "Would you fuck me? I'd fuck me.",
  "seasons": [
    {
      "seasonNumber": "1",
      "id": 1,
      "place": 9
    }
  ]
},
  {
    "id": 2,
    "name": "Tammie Brown",
    "winner": false,
    "missCongeniality": false,
    "image_url": "http://www.nokeynoshade.party/images/tammie-brown.jpg",
    "quote": "I'm not a slut, I'm a lady. You look under my skirt, and it will stick you in the eye though.",
    "seasons": [
      {
        "seasonNumber": "1",
        "id": 1,
        "place": 8
      },
      {
        "seasonNumber": "A1",
        "id": 5,
        "place": 10
      }
    ]
  },
  {
    "id": 3,
    "name": "Akashia",
    "winner": false,
    "missCongeniality": false,
    "image_url": "http://www.nokeynoshade.party/images/akashia.jpg",
    "quote": "If I was a girl, I'd be a stripper, or a slut pregnant with a whole bunch of children.",
    "seasons": [
      {
        "seasonNumber": "1",
        "id": 1,
        "place": 7
      }
    ]
  },
  {
    "id": 4,
    "name": "Jade",
    "winner": false,
    "missCongeniality": false,
    "image_url": "http://www.nokeynoshade.party/images/jade.jpg",
    "quote": "Jade is definitely my alter-ego, basically she has more balls than I do!",
    "seasons": [
      {
        "seasonNumber": "1",
        "id": 1,
        "place": 6
      }
    ]
  },
  {
    "id": 5,
    "name": "Ongina",
    "winner": false,
    "missCongeniality": false,
    "image_url": "http://www.nokeynoshade.party/images/ongina.jpg",
    "quote": "If I don't win this, I swear to god I'm gonna cut someone!",
    "seasons": [
      {
        "seasonNumber": "1",
        "id": 1,
        "place": 5
      }
    ]
  }
]

app.get("/api/v1/queens", (request, response) => {
  const { queens } = app.locals;

  response.json(queens);
});




app.listen(app.get("port"), () => {
  console.log(
    `${app.locals.title} is running on http://localhost:${app.get("port")}. The library is open!`
  );
});

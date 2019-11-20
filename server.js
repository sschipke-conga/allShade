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

app.locals.seasons =[
  {
    "id": 1,
    "seasonNumber": "1",
    "winnerId": 12,
    "image_url": "https://vignette3.wikia.nocookie.net/logosrupaulsdragrace/images/8/81/Rpdr_season1.jpg",
    "queens": [
      {
        "id": 1,
        "name": "Victoria 'Porkchop' Parker",
        "place": 9
      },
      {
        "id": 2,
        "name": "Tammie Brown",
        "place": 8
      },
      {
        "id": 3,
        "name": "Akashia",
        "place": 7
      },
      {
        "id": 4,
        "name": "Jade",
        "place": 6
      },
      {
        "id": 5,
        "name": "Ongina",
        "place": 5
      },
      {
        "id": 9,
        "name": "Shannel",
        "place": 4
      },
      {
        "id": 10,
        "name": "Rebecca Glasscock",
        "place": 3
      },
      {
        "id": 11,
        "name": "Nina Flowers",
        "place": 2
      },
      {
        "id": 12,
        "name": "Bebe Zahara Benet",
        "place": 1
      }
    ]
  },
  {
    "id": 5,
    "seasonNumber": "A1",
    "winnerId": 48,
    "image_url": "https://vignette3.wikia.nocookie.net/logosrupaulsdragrace/images/5/53/Allstars.jpg",
    "queens": [
      {
        "id": 2,
        "name": "Tammie Brown",
        "place": 10
      },
      {
        "id": 9,
        "name": "Shannel",
        "place": 3
      },
      {
        "id": 20,
        "name": "Pandora Boxx",
        "place": 11
      },
      {
        "id": 22,
        "name": "Jujubee",
        "place": 3
      },
      {
        "id": 23,
        "name": "Raven",
        "place": 2
      },
      {
        "id": 27,
        "name": "Mimi Imfurst",
        "place": 12
      },
      {
        "id": 33,
        "name": "Yara Sofia",
        "place": 5
      },
      {
        "id": 34,
        "name": "Alexis Mateo",
        "place": 6
      },
      {
        "id": 35,
        "name": "Manila Luzon",
        "place": 7
      },
      {
        "id": 46,
        "name": "Latrice Royale",
        "place": 7
      },
      {
        "id": 48,
        "name": "Chad Michaels",
        "place": 1
      }
    ]
  },
  {
    "id": 9,
    "seasonNumber": "8",
    "winnerId": 106,
    "image_url": "https://vignette3.wikia.nocookie.net/logosrupaulsdragrace/images/c/c1/S8cast.jpg",
    "queens": [
      {
        "id": 96,
        "name": "Dax ExclamationPoint",
        "place": 11
      },
      {
        "id": 97,
        "name": "Cynthia Lee Fontaine",
        "place": 10
      },
      {
        "id": 98,
        "name": "Naysha Lopez",
        "place": 9
      },
      {
        "id": 99,
        "name": "Acid Betty",
        "place": 8
      },
      {
        "id": 100,
        "name": "Robbie Turner",
        "place": 7
      },
      {
        "id": 101,
        "name": "Thorgy Thor",
        "place": 6
      },
      {
        "id": 102,
        "name": "Derrick Barry",
        "place": 5
      },
      {
        "id": 103,
        "name": "Chi Chi DeVayne",
        "place": 4
      },
      {
        "id": 104,
        "name": "Naomi Smalls",
        "place": 3
      },
      {
        "id": 105,
        "name": "Kim Chi",
        "place": 2
      },
      {
        "id": 106,
        "name": "Bob the Drag Queen",
        "place": 1
      },
      {
        "id": 95,
        "name": "Laila McQueen",
        "place": 12
      }
    ]
  },
  {
    "id": 2,
    "seasonNumber": "2",
    "winnerId": 24,
    "image_url": "https://vignette1.wikia.nocookie.net/logosrupaulsdragrace/images/c/c0/Season2cast.png",
    "queens": [
      {
        "id": 13,
        "name": "Shangela Laquifa Wadley",
        "place": 12
      },
      {
        "id": 14,
        "name": "Nicole Paige Brooks",
        "place": 11
      },
      {
        "id": 15,
        "name": "Mystique Summers Madison",
        "place": 10
      },
      {
        "id": 16,
        "name": "Sonique",
        "place": 9
      },
      {
        "id": 17,
        "name": "Morgan McMichaels",
        "place": 8
      },
      {
        "id": 18,
        "name": "Sahara Davenport",
        "place": 7
      },
      {
        "id": 19,
        "name": "Jessica Wild",
        "place": 6
      },
      {
        "id": 20,
        "name": "Pandora Boxx",
        "place": 5
      },
      {
        "id": 21,
        "name": "Tatianna",
        "place": 4
      },
      {
        "id": 22,
        "name": "Jujubee",
        "place": 3
      },
      {
        "id": 23,
        "name": "Raven",
        "place": 2
      },
      {
        "id": 24,
        "name": "Tyra Sanchez",
        "place": 1
      }
    ]
  },
  {
    "id": 3,
    "seasonNumber": "3",
    "winnerId": 36,
    "image_url": "https://vignette2.wikia.nocookie.net/logosrupaulsdragrace/images/e/e7/RPDRS3.jpg",
    "queens": [
      {
        "id": 13,
        "name": "Shangela Laquifa Wadley",
        "place": 6
      },
      {
        "id": 25,
        "name": "Venus D-Lite",
        "place": 13
      },
      {
        "id": 26,
        "name": "Phoenix",
        "place": 12
      },
      {
        "id": 27,
        "name": "Mimi Imfurst",
        "place": 11
      },
      {
        "id": 28,
        "name": "India Ferrah",
        "place": 10
      },
      {
        "id": 29,
        "name": "Mariah Balenciaga",
        "place": 9
      },
      {
        "id": 30,
        "name": "Stacey Lane Matthews",
        "place": 8
      },
      {
        "id": 31,
        "name": "Delta Work",
        "place": 7
      },
      {
        "id": 32,
        "name": "Carmen Carrera",
        "place": 5
      },
      {
        "id": 33,
        "name": "Yara Sofia",
        "place": 4
      },
      {
        "id": 34,
        "name": "Alexis Mateo",
        "place": 3
      },
      {
        "id": 35,
        "name": "Manila Luzon",
        "place": 2
      },
      {
        "id": 36,
        "name": "Raja",
        "place": 1
      }
    ]
  },
  {
    "id": 10,
    "seasonNumber": "A2",
    "winnerId": 62,
    "image_url": "https://vignette1.wikia.nocookie.net/logosrupaulsdragrace/images/f/f4/AS2cast.jpg",
    "queens": [
      {
        "id": 21,
        "name": "Tatianna",
        "place": 6
      },
      {
        "id": 47,
        "name": "Phi Phi O'Hara",
        "place": 7
      },
      {
        "id": 58,
        "name": "Alyssa Edwards",
        "place": 5
      },
      {
        "id": 59,
        "name": "Coco Montrese",
        "place": 10
      },
      {
        "id": 60,
        "name": "Detox Icunt",
        "place": 3
      },
      {
        "id": 61,
        "name": "Roxxy Andrews",
        "place": 4
      },
      {
        "id": 62,
        "name": "Alaska Thunderfuck 5000",
        "place": 1
      },
      {
        "id": 79,
        "name": "Adore Delano",
        "place": 9
      },
      {
        "id": 90,
        "name": "Katya Zamolodchikova",
        "place": 2
      },
      {
        "id": 93,
        "name": "Ginger Minj",
        "place": 8
      }
    ]
  }
]

app.get("/api/v1/queens", (request, response) => {
  const { queens } = app.locals;

  response.json(queens);
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

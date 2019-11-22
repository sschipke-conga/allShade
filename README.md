# No B(ody) No Shade
RPDR API
 ### Use of this api
 Use this api to get a list of all numerical seasons of RuPaul's Drag Race (Allstar seasons not included).
 See all the queens and which season they participated in. Endpoints and their corresponding responses are listed below:

 <details>
  <summary> <code>GET</code> all the queens </summary>

  example request : `GET` `/api/v1/queens`
  <br>
  example response: 
  ```javascript
  [
    {
        "name": "Victoria `Porkchop' Parker",
        "queen_id": 1,
        "winner": false,
        "miss_congeniality": false,
        "quote": "Would you fuck me? I'd fuck me.",
        "season": 1,
        "season_id": 1,
        "created_at": "2019-11-21T20:20:24.538Z",
        "updated_at": "2019-11-21T20:20:24.538Z"
    },
    {
        "name": "Tammie Brown",
        "queen_id": 2,
        "winner": false,
        "miss_congeniality": false,
        "quote": "I'm not a slut, I'm a lady. You look under my skirt, and it will stick you in the eye though.",
        "season": 1,
        "season_id": 1,
        "created_at": "2019-11-21T20:20:24.540Z",
        "updated_at": "2019-11-21T20:20:24.540Z"
    },
    {..}
  ]
  ```
</details>

---

<details>
  <summary> <code>GET</code> all the seasons </summary>
  
  example request : `GET` `/api/v1/seasons`\
  <br>

  example response: 
  ```javascript
[
    {
        "id": 1,
        "number": 1,
        "winner": "Bebe Zahara Benet",
        "image_url": "https://vignette3.wikia.nocookie.net/logosrupaulsdragrace/images/8/81/Rpdr_season1.jpg",
        "created_at": "2019-11-21T20:20:24.515Z",
        "updated_at": "2019-11-21T20:20:24.515Z"
    },
    {
        "id": 2,
        "number": 2,
        "winner": "Tyra Sanchez",
        "image_url": "https://vignette1.wikia.nocookie.net/logosrupaulsdragrace/images/c/c0/Season2cast.png",
        "created_at": "2019-11-21T20:20:24.519Z",
        "updated_at": "2019-11-21T20:20:24.519Z"
    },
    {
        "id": 3,
        "number": 3,
        "winner": "Raja",
        "image_url": "https://vignette2.wikia.nocookie.net/logosrupaulsdragrace/images/e/e7/RPDRS3.jpg",
        "created_at": "2019-11-21T20:20:24.521Z",
        "updated_at": "2019-11-21T20:20:24.521Z"
    },
    {..}
  ]
  ```
</details>

---

<details>
  <summary> <code>GET</code> a specific queen using their queen_id </summary>
  
  example request : `GET` `/api/v1/queens/49`
  <br>

  example response: 
  ```javascript
{
    "name": "Vivacious",
    "queen_id": 49,
    "winner": false,
    "miss_congeniality": false,
    "quote": "Liza Minelli lies.",
    "season": 6,
    "season_id": 6,
    "created_at": "2019-11-21T20:20:24.571Z",
    "updated_at": "2019-11-21T20:20:24.571Z"
}
  ```
</details>

---

<details>
  <summary> <code>GET</code> a specific season using its id </summary>
  
  example request : `GET` `/api/v1/season/10`
  <br>

  example response: 
  ```javascript
{
    "id": 10,
    "number": 10,
    "winner": "Aquaria",
    "image_url": "https://vignette.wikia.nocookie.net/logosrupaulsdragrace/images/a/af/RPDR_S10_Banner.jpeg",
    "created_at": "2019-11-21T20:20:24.535Z",
    "updated_at": "2019-11-21T20:20:24.535Z"
}
  ```
</details>

---

<details>
  <summary>Adding a new queen to the database</summary>
  
  example request : `POST` `/api/v1/queens`

  <br>

  body:
  ```javascript
{
  "name": "Virginia Beach",
  "winner": false,
  "miss_congeniality": false,
  "quote": "Life's a beach",
  "season": 10
}
  ```

  example response: 
  ```javascript
{
  "queen_id": 154,
  "name": "Virginia Beach",
  "winner": false,
  "miss_congeniality": false,
  "quote": "Life's a beach",
  "season": 10,
  "season_id": 10
}
  ```

  <br>
  Required properties for the queen object


| Key        | Dataype           |
| ------------- |:-------------:|
| name      | `<string>` |
| col 2 is      | centered      |
| zebra stripes | are neat      |


</details>

---






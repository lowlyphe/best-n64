const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const pg = require('pg');
const { application } = require('express');

app.use(express.static('./client')) ;
app.use(cors());

const { DATABASE_URL, NODE_ENV, PORT } = process.env;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min)
}

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

app.get('/api/games', (req,res) => {
  let first = getRandomInt(1, 296);
  let second = getRandomInt(1, 296);
  pool.query('SELECT * FROM games WHERE id in ($1, $2)', [first, second]).then((data) => {
    res.set(200).type('applicaiton/json').send(data.rows)
  })
  
})

app.post('/api/games', (req,res) => {
  pool.query('UPDATE')
})


app.listen(process.env.PORT || 3000, () => {
    console.log('You are now connected')
})
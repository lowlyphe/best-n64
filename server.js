import express from 'express';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import pg from 'pg';


app.use(express.static('./client')) ;
app.use(cors());
app.use(express.json());

const { DATABASE_URL, NODE_ENV, PORT } = process.env;

const random = (quantity, max) =>{
  const set = new Set()
  while(set.size < quantity) {
    set.add(Math.floor(Math.random() * max) + 1)
  }
  return set
}

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

app.get('/api/games', (req,res) => {
  const randomSet = random(2, 297);
  const [first] = randomSet;
  const [, second] = randomSet;
  pool.query('SELECT * FROM games WHERE id in ($1, $2)', [first, second]).then((data) => {
    res.set(200).type('applicaiton/json').send(data.rows)
  })
  
})

app.get('/api/results', (req,res) => {
  pool.query('SELECT * FROM games ORDER BY rating DESC').then((data) => {
    res.set(200).type('applicaiton/json').send(data.rows)
  })
})


app.patch('/api/games', (req,res) => {
  let path = req.body.path;
  console.log(req.body.path)
  pool.query(`UPDATE games SET rating = rating + 1 WHERE path = '${path}'`).then(() => {
    res.set(200).type('text/plain').send('Updated')
  }).catch((err) => {
    console.log(err)
  })
})


app.listen(process.env.PORT || 3000, () => {
    console.log('You are now connected')
})
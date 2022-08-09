import express from 'express';
import cors from 'cors';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
import pg from 'pg';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

//setting up AWS s3
const { DATABASE_URL, NODE_ENV, PORT, BUCKET_NAME, BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY } = process.env;
const s3 = new S3Client ({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey:  AWS_SECRET_KEY
  },
  region: BUCKET_REGION
})



//middleware
app.use(express.static('./client')) ;
app.use(cors());
app.use(express.json());


//get 2 random unique numbers
const random = (quantity, max) =>{
  const set = new Set()
  while(set.size < quantity) {
    set.add(Math.floor(Math.random() * max) + 1)
  }
  return set
}

//setting up pg for psql
const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

app.get('/api/games', async (req,res) => {
  const randomSet = random(2, 297);
  const [first, second] = randomSet;
  const data = await pool.query('SELECT * FROM games WHERE id in ($1, $2)', [first, second])
    
  for (let i = 0; i < data.rows; i++) {
    const getObjectParams = {
      Bucket: BUCKET_NAME,
      Key: data.rows[i].path
    }
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    console.log(url)
    data.rows[i].path = url  
  }
    
  res.set(200).type('applicaiton/json').send(data.rows)
  
 
  
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


app.listen(PORT || 3000, () => {
    console.log('You are now connected')
})
const express = require('express');
const cors = require('cors');
const app = express();
const pg = require('pg');
const { application } = require('express');

app.use(express.static('./client')) ;
app.use(cors());

const { DATABASE_URL, NODE_ENV, PORT } = process.env;

const pool = new pg.Pool({
  connectionString: DATABASE_URL,
  ssl: NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});



app.listen(process.env.PORT || 3000, () => {
    console.log('You are now connected')
})
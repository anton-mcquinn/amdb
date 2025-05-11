import express from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const port = process.env.PORT
const db = process.env.DB_NAME
const user = process.env.DB_USER
const pass = process.env.DB_PASS

const pool = new Pool({
  user,
  host: 'localhost',
  database: db,
  password: pass,
  port: 5432,
});

// test db connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error executing query', err);
  } else {
    console.log('Connected to PostgreSQL on', res.rows[0].now);
  }
});

app.get('/', (req, res) => {
  res.send('Anton\'s Movie Database is Running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


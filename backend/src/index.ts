import app from './app'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const port = 3000
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Anton\'s Movie Database is Running!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

import express from 'express'
import mountRoutes from './routes'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors());
mountRoutes(app)

export default app

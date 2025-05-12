import express from 'express'
import mountRoutes from './routes'

const app = express()
mountRoutes(app)

export default app

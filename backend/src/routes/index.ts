import { getMovies, addLike } from './movies'
import { Application } from 'express'

const mountRoutes = (app: Application): void => {
  app.get('/movies', getMovies)
  app.post('/movies/like', addLike)
}

export default mountRoutes

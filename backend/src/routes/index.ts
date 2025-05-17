import { getMovies, addLike } from './movies'
import { getGenres } from './genres'
import { Application } from 'express'

const mountRoutes = (app: Application): void => {
  app.get('/movies', getMovies)
  app.post('/movies/like', addLike)

  app.get('/genres', getGenres)
}

export default mountRoutes

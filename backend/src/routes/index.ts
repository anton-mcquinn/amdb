import { getMovies, addLike } from './movies'
import { Application } from 'express'

const mountRoutes = (app: Application): void => {
  app.use('/movies', getMovies),
  app.use('/movies/like', addLike)
}

export default mountRoutes

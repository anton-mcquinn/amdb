import { getMovies, addLike } from './movies'
import { getGenres } from './genres'
import { Application } from 'express'
import { add3Star, add4Star, add5Star, get3Star, get4Star, get5Star, addFavGenre, addFavDecade, getFavGenres, getFavDecades } from './users'

const mountRoutes = (app: Application): void => {
  app.get('/movies', getMovies)
  app.post('/movies/like', addLike)

  app.post('/users3', add3Star)
  app.get('/users3', get3Star)
  app.post('/users4', add4Star)
  app.get('/users4', get4Star)
  app.post('/users5', add5Star)
  app.get('/users5', get5Star)
  app.post('/users/genre', addFavGenre)
  app.post('/users/decade', addFavDecade)
  app.get('/users/decade', getFavDecades)
  app.get('/users/genre', getFavGenres)

  app.get('/genres', getGenres)
}

export default mountRoutes

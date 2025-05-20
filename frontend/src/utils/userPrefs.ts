import { fetchStarMovies } from './dbConnect';
import { addFavGenre, addFavDecade } from './dbConnect';

const fetchFavoriteMovies = async (rating: string): Promise<Movie[]> => {
  try {
    const movies = await fetchStarMovies(rating);
    return movies;
  } catch (error) {
    console.error('Failed to fetch favorite movies:', error);
    throw error;
  }
};

const getFavoriteMovies = async (req, res) => {
  try {
    const { rating } = req.params;
    const movies = await fetchFavoriteMovies(rating);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorite movies' });
  }
};

const gatherPopularGenres = (movies: Movie[]) => {
  const genreCount = {};
  
  movies.forEach(movie => {
    if (movie.genres) {
      movie.genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    }
  });
  
  let maxCount = 0;
  let popularGenres = [];
  
  for (const [genre, count] of Object.entries(genreCount)) {
    if (count > maxCount) {
      maxCount = count;
      popularGenres = [genre];
    } else if (count === maxCount) {
      popularGenres.push(genre);
    }
  }
  
  return popularGenres;
};

const gatherPopularDecades = (movies: Movie[]) => {
  const decadeCount = {};
  
  movies.forEach(movie => {
    if (movie.year) {
      const decade = `${Math.floor(movie.year / 10) * 10}s`;
      decadeCount[decade] = (decadeCount[decade] || 0) + 1;
    }
  });
  
  let maxCount = 0;
  let popularDecades = [];
  
  for (const [decade, count] of Object.entries(decadeCount)) {
    if (count > maxCount) {
      maxCount = count;
      popularDecades = [decade];
    } else if (count === maxCount) {
      popularDecades.push(decade);
    }
  }
  
  return popularDecades;
};

export const updateFavoriteGenres = async (req, res) => {
  try {
    const { rating } = req.params;
    
    const favorites = await fetchFavoriteMovies(rating);
    
    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ error: 'No favorite movies found' });
    }
    
    const popularGenres = gatherPopularGenres(favorites);
    
    if (popularGenres.length === 0) {
      return res.status(400).json({ error: 'No genres found in favorite movies' });
    }
    
    const results = await Promise.all(
      popularGenres.map(genre => addFavGenre(genre))
    );
    
    res.status(200).json({ 
      message: 'Favorite genres updated successfully',
      genres: popularGenres 
    });
    return popularGenres;
  } catch (error) {
    console.error('Failed to update favorite genres:', error);
    res.status(500).json({ error: 'Failed to update favorite genres' });
  }
};

export const updateFavoriteDecades = async (req, res) => {
  try {
    const { rating } = req.params;
    const favorites = await fetchFavoriteMovies(rating);
    
    if (!favorites || favorites.length === 0) {
      return res.status(404).json({ error: 'No favorite movies found' });
    }
    
    const popularDecades = gatherPopularDecades(favorites);
    
    if (popularDecades.length === 0) {
      return res.status(400).json({ error: 'No decades found in favorite movies' });
    }
    
    const results = await Promise.all(
      popularDecades.map(decade => addFavDecade(decade))
    );
    res.status(200).json({ 
      message: 'Favorite decades updated successfully',
      decades: popularDecades 
    });
  } catch (error) {
    console.error('Failed to update favorite decades:', error);
    res.status(500).json({ error: 'Failed to update favorite decades' });
  }
};

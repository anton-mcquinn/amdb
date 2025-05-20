import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MovieTile } from './MovieTile';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  year?: number;
  genres?: string[];
  thumbnail: string;
  extract?: string;
}

export default function Recommended() {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = 'http://localhost:3000';
  
  useEffect(() => {
    fetchRecommendedMovies();
  }, []);
  
  const fetchRecommendedMovies = async () => {
    try {
      setLoading(true);
      
      if (genres.length === 0 && decades.length === 0) {
        setError("No favorite genres or decades found. Rate some movies to get recommendations!");
        setLoading(false);
        return;
      }
      
      let moviesResponse;
      if (genres.length > 0 && decades.length > 0) {
        const randomGenre = genres[Math.floor(Math.random() * genres.length)];
        const randomDecade = decades[Math.floor(Math.random() * decades.length)];
        
        moviesResponse = await axios.get(
          `${baseURL}/movies?genre=${randomGenre}&decade=${randomDecade}`
        );
      } else if (genres.length > 0) {
        const randomGenre = genres[Math.floor(Math.random() * genres.length)];
        moviesResponse = await axios.get(`${baseURL}/movies?genre=${randomGenre}`);
      } else {
        const randomDecade = decades[Math.floor(Math.random() * decades.length)];
        moviesResponse = await axios.get(`${baseURL}/movies?decade=${randomDecade}`);
      }
      
      const fiveStarResponse = await axios.get(`${baseURL}/users5`);
      const fiveStarIds = fiveStarResponse.data.movies || [];
      
      let recommendedMovies = moviesResponse.data.filter(
        (movie: Movie) => !fiveStarIds.includes(movie.id)
      );
      
      if (recommendedMovies.length > 20) {
        recommendedMovies = shuffleArray(recommendedMovies).slice(0, 20);
      }
      
      setRecommendedMovies(recommendedMovies);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setError('Failed to load recommendations. Please try again later.');
      setLoading(false);
    }
  };
  
  const shuffleArray = (array: any[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%', 
      p: 3 
    }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Recommended For You
      </Typography>
      
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : recommendedMovies.length > 0 ? (
        <MovieTile movieData={recommendedMovies} />
      ) : (
        <Typography>No recommendations found. Try rating more movies!</Typography>
      )}
    </Box>
  );
}

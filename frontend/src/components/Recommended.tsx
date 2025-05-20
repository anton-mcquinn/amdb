import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { MovieTile } from './MovieTile';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

import { updateFavoriteGenres } from '../utils/userPrefs';

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
      const genres = 0;
      
      if (genres.length === 0 && decades.length === 0) {
        setError("No favorite genres or decades found. Rate some movies to get recommendations!");
        setLoading(false);
        return;
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

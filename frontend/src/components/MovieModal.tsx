import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { addRating } from '../utils/dbConnect.ts';

interface MovieModalProps {
  movie: {
    id: number;
    title: string;
    year?: number;
    genres?: string[];
    description?: string;
    cast?: string[];
    thumbnail: string;
    release_date?: string;
    extract?: string;
    rating?: number;
  } | null;
  open: boolean;
  onClose: () => void;
}

export default function MovieModal({ movie, open, onClose }: MovieModalProps) {
  const [rating, setRating] = React.useState<number | null>(null);

  if (!movie) {
    return null;
  }

  useEffect(() => {
    if (movie && movie.likes !== undefined) {
      setRating(movie.likes);
    } else {
      setRating(null);
    }
  }, [movie]);
  
  if (!movie) {
    return null;
  }

  const handleRatingChange = async (event: React.SyntheticEvent, newValue: number | null) => {
    setRating(newValue);
    if (movie.id && newValue !== null) {
      try {
        const response = await addRating(movie.id, newValue);
        console.log('Rating updated:', response);
      } catch (error) {
        console.error('Error updating rating:', error);
      }
    }
  }
  
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box 
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: "1200px",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          maxHeight: "90vh",
          overflow: "auto"
        }}
      >
        <Box 
          sx={{ 
            flex: { xs: "1 1 100%", md: "0 0 300px" },
            display: "flex",
            justifyContent: "center"
          }}
        >
          <img
            src={movie.thumbnail}
            alt={movie.title}
            style={{ 
              maxWidth: "100%", 
              height: "auto", 
              objectFit: "cover",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom textAlign="center" color="text.primary">
            {movie.title}
          </Typography>
          {movie.year && (
            <Typography variant="h6" gutterBottom textAlign="center" color="text.secondary">
              {movie.year}
            </Typography>
          )}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center', 
              mb: 3
            }}
          >
              <Rating name="movie-rating" 
                max={5} 
                value={rating}
                onChange={handleRatingChange}
              />
          </Box>
          {movie.extract && (
            <Typography variant="body1" color="text.secondary" paragraph>
              {movie.extract}
            </Typography>
          )}
          {movie.description && (
            <Typography variant="body1" paragraph>
              {movie.description}
            </Typography>
          )}
          {movie.genres && (
            <Typography variant="body2" color="text.secondary">
              Genres: {movie.genres.join(", ")}
            </Typography>
          )}
          {movie.cast && (
            <Typography variant="body2" color="text.secondary">
              Cast: {movie.cast.join(", ")}
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  );
}

import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import MovieModal from './MovieModal.tsx'

interface MovieTileProps {
  movieData: Array<{
    id: number;
    title: string;
    thumbnail: string;
    release_date?: string;
    overview?: string;
  }>;
}

export const MovieTile = ({ movieData }: MovieTileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<typeof movieData[0] | null>(null);
  
  const handleDetailsClick = (movie: typeof movieData[0]) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      <ImageList sx={{ width: 800, height: 900 }} cols={4} gap={15}>
        {movieData && movieData.length > 0 ? (
          movieData.map((item) => (
            <ImageListItem key={item.id}>
              <Button 
                color="primary" 
                size="large" 
                onClick={() => handleDetailsClick(item)}
              >
                <img
                  src={`${item.thumbnail}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.thumbnail}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </Button>
            </ImageListItem>
          ))
        ) : (
          <p>No movies found</p>
        )}
      </ImageList>
      
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          open={isModalOpen} 
          onClose={handleCloseModal} 
        />
      )}
    </>
  );
};

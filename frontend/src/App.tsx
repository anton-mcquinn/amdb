import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' 
import './App.css'

import dbConnect, { fetchByGenreAndDecade, fetchByDecade, fetchGenres, fetchByGenre } from './utils/dbConnect.ts'
import {decades} from './utils/decades.ts'
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
}

interface Filter {
  genre: string;
  decade: number;
}

function App() {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [filter, setFilter] = useState<Filter>({
    genre: '',
    decade: '',
  });
  const [count, setCount] = useState(0);
  const [genres, setGenres] = useState<string[]>([]);
  const [decade, setDecade] = useState<string[]>([]);

  const getGenres = async () => {
    try {
      const response = await fetchGenres();
      console.log('Fetched genres:', response);
      // the autocomplete component needs a label key, but the db has a genre key
      const genreStrings = response.map(item => ({ label: item.genre }));
      setGenres(genreStrings);
      console.log('Updated genres:', genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  }
  // just load initial data one time
  useEffect(() => {
      getGenres();
      fetchData();
    }, []);

  // load data when filter changes
 useEffect(() => {
    getGenres();
    if (filter.genre && filter.decade) {
      console.log('Filter changed:', filter.genre.label, filter.decade.label);
      fetchDecadeAndGenre(filter);
    }
    else if (filter.genre) {
      console.log('Filter changed:', filter.genre.label);
      fetchGenre(filter);
    }
    else if (filter.decade) {
      console.log('Filter changed:', filter.decade.label);
      fetchDecade(filter);
    }
  }, [filter]);

  const fetchData = async () => {
    try {
      const response = await dbConnect();
      setMovieData(response);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  };

  const fetchDecade = async (filter: Filter) => {
    try {
      console.log('Fetching decade:', filter.decade);
      const response = await fetchByDecade(filter.decade.label);
      setDecade(response);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }

  const fetchGenre = async (filter: Filter) => {

    try {
      console.log('Fetching genre:', filter.genre.label);
      const response = await fetchByGenre(filter.genre.label);
      setMovieData(response);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }

  const fetchDecadeAndGenre = async (filter: Filter) => {
    try {
      console.log('Fetching decade and genre:', filter.decade.label, filter.genre.label);
      const response = await fetchByGenreAndDecade(filter.genre.label, filter.decade.label);
      setMovieData(response);
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }


return (
  <>
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: 0,
      margin: 0
    }}>
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center', 
        textAlign: 'center', 
        width: '100%', 
        marginBottom: '30px', 
      }}>
        <h1>Anton's Movie Database</h1>
      </Box>  
      
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        gap: 5,
        marginBottom: '20px' 
      }}>
        <Autocomplete
          disablePortal
          id="genre-autocomplete"
          options={genres}
          sx={{ width: 300, backgroundColor: 'white' }}
          value={filter.genre}
          onChange={(event, newValue) => {
            console.log('Selected genre:', newValue);
            setFilter(prev => ({...prev, genre: newValue || ''}));
          }}
          renderInput={(params) => <TextField {...params} label="genre" />}
        />
        <Autocomplete
          disablePortal
          id="decade-autocomplete"
          options={decades}
          sx={{ width: 300, backgroundColor: 'white' }}
          value={filter.decade}
          onChange={(event, newValue) => {
            console.log('Selected decade:', newValue);
            setFilter(prev => ({...prev, decade: newValue || ''}));
          }}
          renderInput={(params) => <TextField {...params} label="decade" />}
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ImageList sx={{ width: 800, height: 900 }} variant="woven" cols={4} gap={15}>
          {movieData.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${item.thumbnail}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.thumbnail}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </Box>
  </>
);}

export default App

import axios from 'axios';
import dotenv from 'dotenv';


const baseURL = 'http://localhost:3000'

const dbConnect = async () => {
  try {
    const response = await axios.get(`${baseURL}/movies?decade=2020s`);
    console.log('Connected to the database:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${baseURL}/genres`);
    console.log('Genres:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
  }

}

export const fetchByGenre = async (genre: string) => {
  try {
    const response = await axios.get(`${baseURL}/movies?genre=${genre}`);
    console.log(`${genre} movies`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
  }

}

export const fetchByDecade = async (decade: string) => {
  try {
    const response = await axios.get(`${baseURL}/movies?decade=${decade}`);
    console.log(`${decade} movies`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by decade:', error);
  }
}

export const fetchByGenreAndDecade = async (genre: string, decade: string) => {
  try {
    const response = await axios.get(`${baseURL}/movies?genre=${genre}&decade=${decade}`);
    console.log(`${decade} ${genre} movies`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre and decade:', error);
  }
}

export const addRating = async (id: number, rating: number) => {
    console.log('Adding rating:', id, rating);
  try {
    const response = await axios.post(`${baseURL}/movies/like`, { id, rating });

    if (rating >= 3 && rating <= 5) {
      addFavMovie(id, rating);
    }
    console.log('Rating set:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error setting rating:', error);
  }
}

export const addFavMovie = async (id: number, rating: number) => {
  try {
    let endpoint;
    switch (rating) {
      case 3:
        endpoint = '/users3';
        break;
      case 4:
        endpoint = '/users4';
        break;
      case 5:
        endpoint = '/users5';
        break;
      default:
        throw new Error('Invalid rating');
    }
    const response = await axios.post(`${baseURL}${endpoint}`, { id });
    console.log('5-star movie added:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding 5-star movie:', error);
  }
}

export default dbConnect;




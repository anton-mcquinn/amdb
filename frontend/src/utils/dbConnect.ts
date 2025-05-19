import axios from 'axios';
import dotenv from 'dotenv';


const dbConnect = async () => {
  try {
    const baseURL = 'http://localhost:3000'
    const response = await axios.get(`${baseURL}/movies?decade=2020s`);
    console.log('Connected to the database:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export const fetchGenres = async () => {
  try {
    const baseURL = 'http://localhost:3000'
    const response = await axios.get(`${baseURL}/genres`);
    console.log('Genres:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
  }

}

export const fetchByGenre = async (genre: string) => {
  try {
    const baseURL = 'http://localhost:3000'
    const response = await axios.get(`${baseURL}/movies?genre=${genre}`);
    console.log(`${genre} movies`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
  }

}

export const fetchByDecade = async (decade: string) => {
  try {
    const baseURL = 'http://localhost:3000'
    const response = await axios.get(`${baseURL}/movies?decade=${decade}`);
    console.log(`${decade} movies`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by decade:', error);
  }
}

export const fetchByGenreAndDecade = async (genre: string, decade: string) => {
  try {
    const baseURL = 'http://localhost:3000'
    const response = await axios.get(`${baseURL}/movies?genre=${genre}&decade=${decade}`);
    console.log(`${decade} ${genre} movies`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by genre and decade:', error);
  }
}

export const addRating = async (id: number, rating: number) => {
  try {
    const baseURL = 'http://localhost:3000'
    const response = await axios.post(`${baseURL}/movies/like`, { id, rating });
    console.log('Rating set:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error setting rating:', error);
  }
}

export default dbConnect;




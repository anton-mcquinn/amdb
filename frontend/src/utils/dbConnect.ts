import axios from 'axios';
import dotenv from 'dotenv';


const dbConnect = async () => {
  try {
    const baseURL = 'http://localhost:3000'
    const response = await axios.get(`${baseURL}/movies`);
    console.log('Connected to the database:', response.data);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

export default dbConnect;




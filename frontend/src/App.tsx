import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' 
import './App.css'

import dbConnect from './utils/dbConnect.ts'
import { DropdownMenu } from './components/Menu.tsx'
import './components/DropdownButton';

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
    decade: 0,
  });

  const [count, setCount] = useState(0);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  }

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dbConnect();
        setMovieData(response);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <DropdownMenu>
          <DropdownMenu.Button>Open Sesame!</DropdownMenu.Button>
        </DropdownMenu>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

import { useState, useEffect } from 'react';
import Layout from '../app/layout';
import AddMovie from "../app/components/AddMovie";
import MovieList from "../app/components/MovieList";

const Films = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `/api/movies`;
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    console.error("Error fetching movies:", error);
    return <p>Error fetching movies</p>;
  }
//display add movie button+ list of movies w/ message if database contains no movies
  return (
    <Layout> 
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>
          <AddMovie />
        </div>
        <div className="w-full flex justify-center">
          {movies ? <MovieList movie={movies} /> : <p>no leos found</p>}
        </div>
      </main>
    </Layout>
  );
};

export default Films;

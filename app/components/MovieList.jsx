import React from 'react';
import Movie from './Movie';

const MovieList = ({ movie }) => {
    return (
        <ul className="flex flex-col items-center mt-4 gap-4">
            {movie.map((movie) => (
                <li className="w-full" key={movie.id}>
                    <Movie movie={movie} />
                </li>
            ))}
        </ul>
    );
};
export default MovieList;

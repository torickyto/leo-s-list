import axios from "axios";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
/*this file allows for the editing and deletion of movie entries
including the addition/editing/removal of actors, the correction of release years and*/
const Movie = ({ movie, onDelete }) => {
    const Router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [movieToEdit, setMovieToEdit] = useState({
        ...movie,
        actors: movie.actors
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);  
// validation for release year variable
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'releaseYear') {
            setMovieToEdit(prevState => ({ ...prevState, [name]: parseInt(value) || '' }));
        } else {
            setMovieToEdit(prevState => ({ ...prevState, [name]: value }));
        }
    };
//handles submission of edits to the database
    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.patch(`/api/movies/${movie.id}`, movieToEdit)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setMovieToEdit({});
                setShowModal(false);
                Router.refresh();
            });
    };
//allows for deletion of movie entries
    const handleDeleteMovie = (id) => {
        axios.delete(`/api/movies/${id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setShowDeleteModal(false);
                Router.refresh();
            });
    };
//allows for changing of actors for created movies
    const handleActorChange = (index, value) => {
        const newActors = [...movieToEdit.actors];
        newActors[index] = value;
        setMovieToEdit({ ...movieToEdit, actors: newActors });
    };
//allows adding of new actors to created movies
    const addActor = () => {
        setMovieToEdit(prevState => ({
            ...prevState,
            actors: [...prevState.actors, ""]
        }));
    };
//allows removal of actors from created movies
    const removeActor = (index) => {
        const newActors = movieToEdit.actors.filter((_, i) => i !== index);
        setMovieToEdit(prevState => ({
            ...prevState,
            actors: newActors
        }));
    };

//section detailing the interface for the editing of created movies (title, actors, release year)
    return (
        <li className="text-center my-3" key={movie.id}>
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            <div>
                {movie.actors.map((actor, index) => (
                    <p key={index}>{actor}</p>
                ))}
            </div>
            <p>{movie.releaseYear}</p>
            <div className="flex justify-center gap-4 my-4">
                <button onClick={() => setShowModal(true)} className=" bg-bitterbrown text-white mr-22 rounded" style={{ width: '100px' }}>edit</button>
                <button onClick={() => setShowDeleteModal(true)} className=" bg-darkestbrown text-white rounded" style={{ width: '100px' }}>delete</button>
            </div>
            <Modal showModal={showModal} setShowModal={setShowModal}>
    <form className="bg-bitterbrown px-8 py-4 rounded-lg text-center" onSubmit={handleEditSubmit}>
        <h1 className="text-xl font-bold mb-4">Edit</h1>
        <div className="mb-3">
            <label className="block text-white mb-2">Title</label>
            {/*allows editing of movie title*/}
            <input 
                type="text"
                placeholder="Title"
                name="title"
                className="text-black"
                value={movieToEdit.title}
                onChange={handleChange}
            />
        </div>
        <div className="mb-3">
            <label className="block text-white mb-2">Actors</label>
            {movieToEdit.actors.map((actor, index) => (
                <div key={index} className="flex justify-center items-center mb-2">
                    <input
                        type="text"
                        placeholder={`Actor ${index + 1}`}
                        value={actor}
                        onChange={(e) => handleActorChange(index, e.target.value)}
                        className="text-black"
                    />
                    <button type="button" onClick={() => removeActor(index)} className="bg-chocobrown text-white px-3 py-1">Remove</button>
                </div>
            ))}
            <button type="button" onClick={addActor} className="bg-chocobrown text-white px-3 py-1 mt-2">add new actor</button>
        </div>
        <div className="mb-3">
            <label className="block text-white mb-2">Release Year</label>
            <input
                type="text"
                placeholder="Release Year"
                name="releaseYear"
                className="text-black"
                value={movieToEdit.releaseYear}
                onChange={handleChange}
            />
        </div>
        <button type="submit" className="bg-milkbrown text-chocobrown px-7 py-1 mt-4">Update</button>
    </form>
</Modal>
{/*popup for confirmation of movie entry deletion*/}
            {showDeleteModal && (
    <Modal showModal={showDeleteModal} setShowModal={setShowDeleteModal}>
        <div className=" bg-darkestbrown text-center p-5 rounded">
            <p className="text-4xl font-bold mb-4">Delete Movie?</p>
            <div className="flex justify-center gap-4">
                <button 
                    onClick={() => handleDeleteMovie(movie.id)} 
                    className=" text-white font-bold py-2 px-4 text-xl rounded hover:bg-brown-700 transition-colors"
                >
                    Delete
                </button>
                <button 
                    onClick={() => setShowDeleteModal(false)} 
                    className="bg-darkestbrown text-white font-bold py-2 px-4 text-xl rounded hover:bg-brown-700 transition-colors"
                >
                    NO
                </button>
            </div>
        </div>
    </Modal>
)}
        </li>
    );
}

export default Movie;

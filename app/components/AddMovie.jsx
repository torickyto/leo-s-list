"use client";
import React from "react";
import Modal from "./Modal";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Adds a movie to the database
const AddMovie = () => {
    const Router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState({ title: '', actors: [], releaseYear: '' });
  const [actorInput, setActorInput] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput(prevState => ({ ...prevState, [name]: value }));
};

const handleActorInputChange = (e) => {
    setActorInput(e.target.value);
};

// Adds an actor to the movie in the database
const addActor = () => {
    if (actorInput.trim()) {
        setInput(prevState => ({
            ...prevState,
            actors: [...prevState.actors, actorInput.trim()]
        }));
        setActorInput(''); // Reset the actor input field after adding an actor
    }
};

const removeActor = (index) => {
    const newActors = movieToEdit.actors.filter((_, i) => i !== index);
    setMovieToEdit({ ...movieToEdit, actors: newActors });
};

const handleSubmit = (e) => {
    e.preventDefault();

    const inputData = {
        ...input,
        releaseYear: parseInt(input.releaseYear) || 0,
    };

    axios.post("/api/movies", inputData)
        .then(res => console.log(res))
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
            setInput({ title: '', actors: [], releaseYear: '' });
            setShowModal(false); 
            Router.refresh();
        });
};

  
return (
    <div className="flex flex-col items-center">
        <div className="my-4"> {/* button to bring up interface to add new movies */}
            <button onClick={() => setShowModal(true)} className=" bg-bitterbrown hover:bg-notactuallybrown text-white font-bold py-2 px-4 rounded">
                add to the leo list
            </button>
        </div>
            {/*defines the input boxes for fields in new movie data*/}
        <Modal showModal={showModal} setShowModal={setShowModal}>
        <form className="bg-bitterbrown py-6 px-9 rounded mx-auto max-w-md text-center" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4">new leo movie</h1>
        <div className="mb-4">
            <input
                type="text"
                placeholder="Title"
                name="title"
                className="form-input text-black w-full mb-2"
                value={input.title}
                onChange={handleChange}
            />
        </div>
        <div className="mb-4">
            <input
                type="text"
                placeholder="Leonardo DiCaprio"
                value={actorInput}
                onChange={handleActorInputChange}
                className="text-black w-full mb-2"
            />
            <button type="button" onClick={addActor} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto">Add Actor</button>
        </div>
        {input.actors.map((actor, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
                <span>{actor}</span>
                <button type="button" onClick={() => removeActor(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Remove</button>
            </div>
        ))}
        <div className="mb-4">
            <input
                type="text"
                placeholder="Year"
                name="releaseYear"
                className="form-input text-black w-full"
                value={input.releaseYear}
                onChange={handleChange}
            />
        </div>
        <button type="submit" className="  bg-notactuallybrown hover:bg-chocobrown text-white font-bold py-2 px-4 rounded">Submit</button>
    </form>
        </Modal>
    </div>
);
};

export default AddMovie;
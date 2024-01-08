import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import { IconBrandNetflix } from "@tabler/icons-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import MovieList from "./components/MovieList";

const BASE_URL = "https://movies-crud-2.academlo.tech";

function App() {
  const [movies, setMovies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    reset({
      name: "",
      genre: "",
      duration: "",
      release_date: "",
    });
    setMovieToEdit(null);
  };

  const handleUpdateMovie = (movie) => {
    handleOpenModal();
    setMovieToEdit(movie);
  };

  const createMovie = (newMovie) => {
    axios
      .post(BASE_URL + "/movies/", newMovie)
      .then(({ data: newMovie }) => {
        setMovies([...movies, newMovie]);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  const deleteMovie = (idMovieToDelete) => {
    axios
      .delete(BASE_URL + `/movies/${idMovieToDelete}/`)
      .then(() => {
        const newMovies = movies.filter(
          (movie) => movie.id !== idMovieToDelete
        );
        setMovies(newMovies);
      })
      .catch((err) => console.log(err));
  };

  const updateMovie = (movie) => {
    axios
      .patch(BASE_URL + `/movies/${movieToEdit.id}/`, movie)
      .then(({ data: updatedMovie }) => {
        const newMovies = movies.map((movie) =>
          movie.id === movieToEdit.id ? updatedMovie : movie
        );
        setMovies(newMovies);
        handleCloseModal();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(BASE_URL + "/movies/")
      .then(({ data }) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (movieToEdit !== null) {
      //? Tengo la certeza de que ya hay una pelicula en el estado
      reset(movieToEdit);
    }
  }, [movieToEdit]);

  return (
    <main className="text-[18px]">
      <header className="flex justify-between p-2">
        <h1 className="text-center p-2 font-bold bg-blue-500 rounded-md transition-all flex gap-1">Peliculas</h1>
        <button
          className="bg-black text-white font-semibold p-2 rounded-2xl hover:bg-blue-600 transition-all flex gap-1 items-center"
          onClick={handleOpenModal}
        >
          Agregar pelicula <IconBrandNetflix />
        </button>
      </header>
      <Modal
        showModal={showModal}
        onCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        register={register}
        createMovie={createMovie}
        isUpdating={!!movieToEdit}
        updateMovie={updateMovie}
        errors={errors}
      />
      <MovieList
        movies={movies}
        deleteMovie={deleteMovie}
        handleUpdateMovie={handleUpdateMovie}
      />
    </main>
  );
}

export default App;

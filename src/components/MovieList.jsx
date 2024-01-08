import { IconEdit, IconTrashFilled } from "@tabler/icons-react";

const MovieList = ({ movies, deleteMovie, handleUpdateMovie }) => {
  return (
    <section className="grid gap-6 grid-cols-[repeat(auto-fill,_280px)] justify-center max-w-[1200px] mx-auto py-10">
      {movies.map((movie) => (
        <article
          key={movie.id}
          className="border-2 rounded-md py-2 px-4 hover:shadow-lg transition-shadow grid gap-2"
        >
          <h2 className="capitalize font-bold text-lg line-clamp-1">
            {movie.name}
          </h2>
          <ul>
            <li>
              <span className="font-semibold">Genero:</span> {movie.genre}
            </li>
            <li>
              <span className="font-semibold">Duracion:</span> {movie.duration}
            </li>
            <li>
              <span className="font-semibold">Lanzamiento:</span>{" "}
              {movie.release_date}
            </li>
          </ul>
          <div className="flex gap-2">
            <button
              onClick={() => handleUpdateMovie(movie)}
              className="rounded-md p-1 text-white bg-yellow-500 hover:shadow-lg hover:bg-yellow-400 transition-colors"
            >
              <IconEdit />
            </button>
            <button
              onClick={() => deleteMovie(movie.id)}
              className="rounded-md p-1 text-white bg-red-500 hover:shadow-lg hover:bg-red-400 transition-colors"
            >
              <IconTrashFilled />
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};
export default MovieList;

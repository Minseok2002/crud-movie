import { IconMinus} from "@tabler/icons-react";

const Modal = ({
  showModal,
  onCloseModal,
  handleSubmit,
  register,
  createMovie,
  isUpdating,
  updateMovie,
  errors,
}) => {
  const submit = (currentMovie) => {
    isUpdating ? updateMovie(currentMovie) : createMovie(currentMovie);
  };
  console.log(errors);
  const titleForm = isUpdating ? "Actualizar pelicula" : "Crear pelicula";
  const textButtonSubmit = isUpdating ? "Guardar cambios" : "Crear";

  return (
    <section
      className={`fixed bg-blue-200/40 top-0 left-0 right-0 h-screen flex justify-center items-center transition-all p-2 ${
        showModal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="grid gap-4 [&>label]:grid [&>label]:gap-1 [&>label>span>span]:text-red-500 [&>label>span]:text-sm [&>label>span]:font-semibold bg-white p-4 rounded-md relative w-[min(100%,_280px)]"
      >
        <button
          onClick={onCloseModal}
          type="button"
          className="absolute top-2 right-2 hover:text-red-500 transition-colors"
        >
          <IconMinus size={20} />
        </button>
        <h2 className="text-center font-semibold">{titleForm}</h2>
        <label>
          <span>
            Nombre: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              maxLength: {
                value: 20,
                message: "Escribe maximo 20 caracteres",
              },
              minLength: {
                value: 5,
                message: "Escribe minimo 5 caracteres",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </label>
        <label>
          <span>
            Genero: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="text"
            {...register("genre")}
          />
        </label>
        <label>
          <span>
            Duración: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="number"
            {...register("duration", {
              max: {
                value: 120,
                message: "Solo se pueden peliculas de maximo 120 min",
              },
            })}
          />
          {errors.duration && (
            <span className="text-red-500 text-xs">
              {errors.duration.message}
            </span>
          )}
        </label>
        <label>
          <span>
            Fecha de lanzamiento: <span>*</span>
          </span>
          <input
            className="border-2 rounded-md p-1 outline-none"
            type="date"
            {...register("release_date")}
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-green-600 transition-all uppercase hover:tracking-widest"
        >
          {textButtonSubmit}
        </button>
      </form>
    </section>
  );
};
export default Modal;



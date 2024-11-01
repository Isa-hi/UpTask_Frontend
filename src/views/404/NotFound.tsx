import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
    <h1 className="font-black text-center text-4xl text-white">
        Página no encontrada
    </h1>
    <p className="mt-10 text-center text-white">
        Talvez quieras{' '}
        <Link to="/" className="text-fuchsia-500">Volver a proyectos</Link>
    </p>
    </>
  )
}

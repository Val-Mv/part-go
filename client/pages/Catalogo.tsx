import { Link } from "react-router-dom";

export default function Catalogo() {
  return (
    <div className="min-h-screen bg-partgo-hero flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md text-center">
        <h1
          className="text-white text-4xl font-semibold mb-4"
          style={{ fontFamily: "Montserrat" }}
        >
          CATÁLOGO
        </h1>
        <p
          className="text-white text-xl mb-8"
          style={{ fontFamily: "Montserrat" }}
        >
          Esta página está en construcción.
        </p>
        <Link to="/menu">
          <button
            className="bg-white text-black px-8 py-3 rounded-2xl text-xl font-semibold shadow-md hover:shadow-lg transition-shadow"
            style={{ fontFamily: "Montserrat" }}
          >
            Volver al Menú
          </button>
        </Link>
      </div>
    </div>
  );
}

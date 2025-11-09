import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

export default function RecuperarContrasena() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Por favor ingresa tu correo electrónico");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un correo válido");
      return;
    }

    // Simulate sending recovery email
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-partgo-red via-partgo-orange to-partgo-yellow flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 w-full flex justify-center">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/38f11cae9061bf779f409ccd300b88f0a804aeaf?width=570"
            alt="PartGo Logo"
            className="w-64 h-auto max-w-[285px]"
          />
        </div>

        {/* Title */}
        <h1 
          className="text-white text-center text-3xl md:text-4xl font-bold italic mb-4 drop-shadow-lg" 
          style={{ fontFamily: 'Montserrat, -apple-system, Roboto, Helvetica, sans-serif' }}
        >
          Recuperar Contraseña
        </h1>

        {!sent ? (
          <>
            <p className="text-white text-lg text-center mb-8" style={{ fontFamily: 'Montserrat' }}>
              Ingresa tu correo electrónico para recibir instrucciones de recuperación
            </p>

            <form onSubmit={handleSubmit} className="w-full max-w-[318px] space-y-4 mb-6">
              <div>
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-5 rounded-2xl text-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-white"
                  style={{ fontFamily: 'Montserrat' }}
                />
              </div>

              {error && (
                <p className="text-white text-center font-semibold" style={{ fontFamily: 'Montserrat' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full h-16 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              >
                <span className="text-black text-2xl font-semibold text-center" style={{ fontFamily: 'Montserrat' }}>
                  ENVIAR
                </span>
              </button>
            </form>
          </>
        ) : (
          <div className="w-full max-w-[318px] text-center mb-8">
            <p className="text-white text-xl mb-6" style={{ fontFamily: 'Montserrat' }}>
              ✓ Hemos enviado las instrucciones a tu correo electrónico
            </p>
          </div>
        )}

        <Link to="/">
          <p className="text-white text-lg font-normal italic text-center hover:underline" style={{ fontFamily: 'Montserrat' }}>
            ← Volver al inicio
          </p>
        </Link>
      </div>
    </div>
  );
}

import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un correo válido");
      return;
    }

    // Simulate login - in production, this would call an API
    navigate("/menu");
  };

  return (
    <div className="min-h-screen bg-partgo-hero flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6 w-full flex justify-center">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/38f11cae9061bf779f409ccd300b88f0a804aeaf?width=570"
            alt="PartGo Logo"
            className="w-64 h-auto max-w-[285px]"
          />
        </div>

        {/* Acceder Title */}
        <h1
          className="text-white text-center text-4xl md:text-5xl font-normal italic mb-8 drop-shadow-lg"
          style={{
            fontFamily:
              "Montserrat, -apple-system, Roboto, Helvetica, sans-serif",
            textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            WebkitTextStroke: "1px white",
          }}
        >
          Acceder
        </h1>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-[318px] space-y-4 mb-6"
        >
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 px-5 rounded-2xl text-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-white"
              style={{ fontFamily: "Montserrat" }}
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 px-5 rounded-2xl text-lg bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-white"
              style={{ fontFamily: "Montserrat" }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p
              className="text-white text-center font-semibold"
              style={{ fontFamily: "Montserrat" }}
            >
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-16 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <span
              className="text-black text-2xl font-semibold text-center"
              style={{ fontFamily: "Montserrat" }}
            >
              INGRESAR
            </span>
          </button>
        </form>

        {/* Password Recovery Link */}
        <Link to="/recuperar-contrasena">
          <p
            className="text-white text-xl font-bold italic text-center mb-4 hover:underline"
            style={{ fontFamily: "Montserrat" }}
          >
            Recuperar contraseña aqui
          </p>
        </Link>

        {/* Back to Social Login */}
        <Link to="/">
          <p
            className="text-white text-lg font-normal italic text-center hover:underline"
            style={{ fontFamily: "Montserrat" }}
          >
            ← Volver a opciones de inicio
          </p>
        </Link>
      </div>
    </div>
  );
}

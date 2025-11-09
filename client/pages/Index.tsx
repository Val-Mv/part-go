import { useNavigate, Link } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  const handleSocialLogin = (provider: string) => {
    // Simulate social login - in production, this would use actual OAuth
    console.log(`Logging in with ${provider}...`);

    // Simulate a brief delay for the authentication process
    setTimeout(() => {
      navigate("/menu");
    }, 800);
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
        <h1 className="text-white text-center text-4xl md:text-5xl font-normal italic mb-12 drop-shadow-lg" style={{ 
          fontFamily: 'Montserrat, -apple-system, Roboto, Helvetica, sans-serif',
          textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
          WebkitTextStroke: '1px white'
        }}>
          Acceder
        </h1>

        {/* Social Login Buttons */}
        <div className="w-full max-w-[318px] space-y-4 mb-6">
          {/* Google Button */}
          <button
            onClick={() => handleSocialLogin("Google")}
            className="w-full h-16 bg-white rounded-2xl flex items-center px-4 shadow-md hover:shadow-lg transition-shadow active:scale-95"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/b96a9b104a1e350f30c1643a22e3707b8281a512?width=90"
              alt="Google"
              className="w-11 h-11"
            />
            <span className="flex-1 text-black text-2xl font-medium italic text-center" style={{ fontFamily: 'Montserrat' }}>
              GOOGLE
            </span>
          </button>

          {/* Apple Button */}
          <button
            onClick={() => handleSocialLogin("Apple")}
            className="w-full h-16 bg-white rounded-2xl flex items-center px-4 shadow-md hover:shadow-lg transition-shadow active:scale-95"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/98a17f6a45d1a7d35457f203bf501994c918f31a?width=76"
              alt="Apple"
              className="w-10 h-12"
            />
            <span className="flex-1 text-black text-2xl font-medium italic text-center" style={{ fontFamily: 'Montserrat' }}>
              APPLE
            </span>
          </button>

          {/* Facebook Button */}
          <button
            onClick={() => handleSocialLogin("Facebook")}
            className="w-full h-16 bg-[#3b5998] rounded-2xl flex items-center px-2 shadow-md hover:shadow-lg transition-shadow relative active:scale-95"
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/147651da3d86458d12e12fea6829da748681f21c?width=94"
              alt="Facebook"
              className="w-12 h-12"
            />
            <span className="flex-1 text-white text-2xl font-medium italic text-center" style={{ fontFamily: 'Montserrat' }}>
              FACEBOOK
            </span>
          </button>
        </div>

        {/* Email/Password Login Link */}
        <Link to="/login">
          <p className="text-white text-xl font-thin italic mb-2 text-center drop-shadow-md hover:underline cursor-pointer" style={{
            fontFamily: 'Montserrat',
            textShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
            WebkitTextStroke: '1px white'
          }}>
            Iniciar con correo y contraseña
          </p>
        </Link>

        {/* Password Recovery Link */}
        <Link to="/recuperar-contrasena">
          <p className="text-white text-xl font-bold italic text-center hover:underline cursor-pointer" style={{ fontFamily: 'Montserrat' }}>
            Recuperar contraseña aqui
          </p>
        </Link>
      </div>
    </div>
  );
}

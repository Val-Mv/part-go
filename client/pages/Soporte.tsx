import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";

export default function Soporte() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");

  const loadProfile = () => {
    const profile = getUserProfile();
    if (profile && profile.nombre) {
      setUserName(profile.nombre.toUpperCase());
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleLogout = () => {
    clearUserProfile();
    setShowProfileMenu(false);
    navigate("/");
  };

  const faqs = [
    {
      id: 1,
      question: "¿Como modificar mi informacion personal?",
    },
    {
      id: 2,
      question: "No puedo actualizar el estado del pedido",
    },
    {
      id: 3,
      question: "Muy pocos repuestos disponibles",
    },
  ];

  return (
    <div className="min-h-screen bg-partgo-hero flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-6 flex items-center justify-between">
        <h1
          className="text-white text-3xl sm:text-4xl font-semibold"
          style={{
            fontFamily: "Montserrat",
            textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            WebkitTextStroke: "1px white",
          }}
        >
          SOPORTE
        </h1>
        <button
          onClick={() => setShowProfileMenu(true)}
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-white flex-shrink-0 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://api.builder.io/api/v1/image/assets/TEMP/93f6caefbcf31077d0168431256f02dbf5b353b2?width=139')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 pb-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-2xl mx-auto">
          {/* Title */}
          <h2
            className="text-center text-[#111010] text-xl sm:text-2xl font-bold mb-8"
            style={{ fontFamily: "Montserrat" }}
          >
            PREGUNTAS FRECUENTES
          </h2>

          {/* FAQ Items */}
          <div className="space-y-4 mb-12">
            {faqs.map((faq) => (
              <button
                key={faq.id}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-black bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <span
                  className="text-left text-black text-base font-semibold flex-1"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {faq.question}
                </span>
                <ChevronRight className="w-6 h-6 text-[#1D1B20] flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>

          {/* Help Section */}
          <div className="text-center">
            <p
              className="text-black text-lg sm:text-xl font-bold mb-4"
              style={{ fontFamily: "Montserrat" }}
            >
              ¿Necesitas ayuda?
            </p>
            <button className="w-full max-w-sm mx-auto py-4 rounded-2xl border border-[#FF3C00] bg-white hover:bg-gray-50 transition-colors">
              <span
                className="text-[#FF3C00] text-lg sm:text-xl font-bold"
                style={{ fontFamily: "Montserrat" }}
              >
                LLAMANOS
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Menu Modal */}
      {showProfileMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setShowProfileMenu(false)}
          ></div>

          {/* Profile Card */}
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white rounded-[78px] w-full max-w-[328px] p-8 shadow-2xl">
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <div
                  className="w-[101px] h-[103px] rounded-full border-2 border-[#E32712] bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://api.builder.io/api/v1/image/assets/TEMP/93f6caefbcf31077d0168431256f02dbf5b353b2?width=139')",
                  }}
                ></div>
              </div>

              {/* Name */}
              <h2
                className="text-[#E32712] text-center text-lg font-semibold mb-6"
                style={{ fontFamily: "Montserrat" }}
              >
                {userName}
              </h2>

              {/* Menu Options */}
              <div className="space-y-4">
                {/* Perfil */}
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/perfil");
                  }}
                  className="w-full flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="w-[30px] h-[33px] rounded-full bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage:
                        "url('https://api.builder.io/api/v1/image/assets/TEMP/85dbf2d05cb2d84f9d2377ef0d971836b00c2642?width=60')",
                    }}
                  ></div>
                  <span
                    className="text-black text-lg font-semibold"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    PERFIL
                  </span>
                </button>

                {/* Soporte Técnico */}
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/soporte");
                  }}
                  className="w-full flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="w-[30px] h-[33px] rounded-full bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage:
                        "url('https://api.builder.io/api/v1/image/assets/TEMP/d8ab11eaa9611bedf1df2241b01751b1e1113e2c?width=60')",
                    }}
                  ></div>
                  <span
                    className="text-black text-lg font-semibold"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    SOPORTE TECNICO
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#6D6E73] my-6"></div>

              {/* Cerrar Sesión */}
              <button
                onClick={handleLogout}
                className="w-full text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <span
                  className="text-[#6D6E73] text-lg font-semibold"
                  style={{ fontFamily: "Montserrat" }}
                >
                  Cerrar Sesion
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

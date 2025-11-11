import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Soporte() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(180deg, #FF3C00 0%, #FFA800 100%)",
      }}
    >
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
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50"
          onClick={() => setShowProfileMenu(false)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md p-6 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Profile Header */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
              <div
                className="w-16 h-16 rounded-full bg-cover bg-center flex-shrink-0"
                style={{
                  backgroundImage:
                    "url('https://api.builder.io/api/v1/image/assets/TEMP/93f6caefbcf31077d0168431256f02dbf5b353b2?width=139')",
                }}
              />
              <div>
                <h3
                  className="text-black text-lg font-bold"
                  style={{ fontFamily: "Montserrat" }}
                >
                  Usuario
                </h3>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-2">
              {/* Perfil */}
              <button
                onClick={() => navigate("/perfil")}
                className="w-full flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div
                  className="w-[30px] h-[33px] rounded-full bg-cover bg-center flex-shrink-0"
                  style={{
                    backgroundImage:
                      "url('https://api.builder.io/api/v1/image/assets/TEMP/ad33659c33381eac40061641b81f19d65a13ad9f?width=60')",
                  }}
                />
                <span
                  className="text-black text-lg font-semibold"
                  style={{ fontFamily: "Montserrat" }}
                >
                  MI PERFIL
                </span>
              </button>

              {/* Pedidos */}
              <button
                onClick={() => navigate("/pedidos")}
                className="w-full flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div
                  className="w-[30px] h-[33px] rounded-full bg-cover bg-center flex-shrink-0"
                  style={{
                    backgroundImage:
                      "url('https://api.builder.io/api/v1/image/assets/TEMP/c8e88f49e9a6dc0ead2f8d80d8a46f0e88dd0f0e?width=60')",
                  }}
                />
                <span
                  className="text-black text-lg font-semibold"
                  style={{ fontFamily: "Montserrat" }}
                >
                  MIS PEDIDOS
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
                <div
                  className="w-[30px] h-[33px] rounded-full bg-cover bg-center flex-shrink-0"
                  style={{
                    backgroundImage:
                      "url('https://api.builder.io/api/v1/image/assets/TEMP/d8ab11eaa9611bedf1df2241b01751b1e1113e2c?width=60')",
                  }}
                />
                <span
                  className="text-black text-lg font-semibold"
                  style={{ fontFamily: "Montserrat" }}
                >
                  SOPORTE TECNICO
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200" />

            {/* Logout */}
            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <div
                className="w-[30px] h-[33px] rounded-full bg-cover bg-center flex-shrink-0"
                style={{
                  backgroundImage:
                    "url('https://api.builder.io/api/v1/image/assets/TEMP/2aa86e65b1d30e1b54f4eb2d96636de4f2464301?width=60')",
                }}
              />
              <span
                className="text-[#FF3C00] text-lg font-semibold"
                style={{ fontFamily: "Montserrat" }}
              >
                CERRAR SESION
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

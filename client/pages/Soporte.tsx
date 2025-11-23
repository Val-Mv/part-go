import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";
import { ProfileModal } from "@/components/ProfileModal";

export default function Soporte() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  const loadProfile = () => {
    const profile = getUserProfile();
    if (profile) {
      if (profile.nombre) setUserName(profile.nombre.toUpperCase());
      if (profile.avatar) setUserAvatar(profile.avatar);
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
      <ProfileModal
        isOpen={showProfileMenu}
        onClose={() => setShowProfileMenu(false)}
        userName={userName}
        userAvatar={userAvatar}
        onLogout={handleLogout}
      />
    </div>
  );
}

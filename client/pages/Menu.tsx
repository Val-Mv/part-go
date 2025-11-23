import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";
import { ProfileModal } from "@/components/ProfileModal";
import {
  ShoppingCart,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Menu() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [userAvatar, setUserAvatar] = useState(
    "https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138",
  );
  const navigate = useNavigate();

  const loadProfile = () => {
    const profile = getUserProfile();
    if (profile) {
      if (profile.nombre) setUserName(profile.nombre.toUpperCase());
      if (profile.avatar) setUserAvatar(profile.avatar);
    }
  };

  useEffect(() => {
    // Load profile every time the component mounts
    loadProfile();
  }, []);

  const handleLogout = () => {
    clearUserProfile();
    setShowProfileMenu(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-partgo-hero flex items-center justify-center px-4 py-8 relative">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-12">
          <h1
            className="text-white text-5xl font-semibold text-center flex-1"
            style={{
              fontFamily: "Montserrat",
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
              WebkitTextStroke: "1px white",
            }}
          >
            MENU
          </h1>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-16 h-16 rounded-full border-2 border-white flex-shrink-0 hover:scale-105 transition-transform overflow-hidden bg-gray-200"
          >
            <img
              src={userAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* Main Action Circles */}
        <div className="w-full flex justify-center gap-4 mb-6">
          <button
            onClick={() => navigate("/filtro-vehiculo")}
            className="w-36 h-36 rounded-full bg-cover bg-center shadow-lg hover:scale-105 transition-transform"
            style={{
              backgroundImage:
                "url('https://api.builder.io/api/v1/image/assets/TEMP/41cc57a412a0ecb7e173d2008b46a3ec20ae147f?width=312')",
            }}
          ></button>
          <button
            onClick={() => navigate("/pedidos")}
            className="w-36 h-36 rounded-full bg-cover bg-center shadow-lg hover:scale-105 transition-transform"
            style={{
              backgroundImage:
                "url('https://api.builder.io/api/v1/image/assets/TEMP/4c34988cca03487ce380295f5cea2f14cba53d44?width=312')",
            }}
          ></button>
        </div>

        {/* Labels for Actions */}
        <div className="w-full flex justify-between mb-6 px-2">
          <div
            className="text-white text-xl font-semibold text-center w-1/2"
            style={{ fontFamily: "Montserrat" }}
          >
            FILTRO DE VEHICULO
          </div>
          <div
            className="text-white text-xl font-semibold text-center w-1/2"
            style={{ fontFamily: "Montserrat" }}
          >
            PEDIDOS
          </div>
        </div>

        {/* Logo */}
        <div className="w-full flex justify-center mb-8">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/0c9a5674c59451116a3583cb9aabc12384c79472?width=478"
            alt="PartGo Logo"
            className="w-56 h-auto"
          />
        </div>

        {/* Modo Socio Button */}
        <div className="w-full max-w-[318px]">
          <Link to="/socio">
            <button className="w-full h-16 bg-white rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
              <span
                className="text-black text-2xl font-semibold text-center"
                style={{ fontFamily: "Montserrat" }}
              >
                MODO SOCIO
              </span>
            </button>
          </Link>
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

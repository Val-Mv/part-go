import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";
import { Search } from "lucide-react";

export default function Catalogo() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  // Sample product data
  const products = [
    {
      id: 1,
      name: "KIT DE CILINDRO",
      price: "$583.000",
      type: "ORIGINAL",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/cdf073f1082d4432a207b254e9dd7c7d6489a4f6?width=248",
    },
    {
      id: 2,
      name: "KIT DE CILINDRO",
      price: "$242.500",
      type: "GENERICO",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d2dc656134920a8164b10184da5f8959a37c8cf9?width=236",
    },
    {
      id: 3,
      name: "PASTILLA DE FRENO",
      price: "$281.000",
      type: "ORIGINAL",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ba45d26294a6df5720017ed2523045ff81a91013?width=290",
    },
    {
      id: 4,
      name: "PASTILLA DE FRENO",
      price: "$70.000",
      type: "GENERICO",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d18aa3f62ccfe3b68f1195acadf2e8d5bd1c1899?width=286",
    },
  ];

  return (
    <div className="min-h-screen bg-partgo-hero flex items-center justify-center px-4 py-8 relative">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-8">
          <h1
            className="text-white text-5xl font-semibold text-center flex-1"
            style={{
              fontFamily: "Montserrat",
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
              WebkitTextStroke: "1px white",
            }}
          >
            CATALOGO
          </h1>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-16 h-16 rounded-full border-2 border-white bg-cover bg-center flex-shrink-0 hover:scale-105 transition-transform"
            style={{
              backgroundImage:
                "url('https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138')",
            }}
          ></button>
        </div>

        {/* Search and Product Grid Container */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-lg">
          {/* Search Input */}
          <div className="relative mb-6">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Search className="w-6 h-6 text-[#A8A4A4]" />
            </div>
            <input
              type="text"
              placeholder="REPUESTO"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-14 pr-4 bg-[#F5F5F5] rounded-xl text-[#A8A4A4] text-xl font-bold placeholder:text-[#A8A4A4] focus:outline-none focus:ring-2 focus:ring-partgo-primary"
              style={{ fontFamily: "Montserrat" }}
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                {/* Product Image */}
                <div className="w-full aspect-square bg-[#F5F5F5] flex items-center justify-center p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="p-3 space-y-1">
                  <h3
                    className="text-black text-xs font-semibold text-center"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {product.name}
                  </h3>
                  <p
                    className="text-[#A8A4A4] text-[10px] font-semibold text-center"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {product.price}
                  </p>
                  <p
                    className={`text-[13px] font-semibold text-center ${
                      product.type === "ORIGINAL"
                        ? "text-[#2EF54F]"
                        : "text-[#F52E2E]"
                    }`}
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {product.type}
                  </p>
                </div>
              </div>
            ))}
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
                      "url('https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138')",
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
                <button className="w-full flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
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

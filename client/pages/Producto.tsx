import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";
import { Minus, Plus } from "lucide-react";

export default function Producto() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

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

  // Sample product data - in real app this would come from API or state
  const products: { [key: string]: any } = {
    "1": {
      id: 1,
      name: "KIT DE CILINDRO",
      price: "$583.000",
      type: "ORIGINAL",
      warranty: "YAMAHA - XTZ 125",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/cdf073f1082d4432a207b254e9dd7c7d6489a4f6?width=248",
    },
    "2": {
      id: 2,
      name: "KIT DE CILINDRO",
      price: "$242.500",
      type: "GENERICO",
      warranty: "YAMAHA - XTZ 125",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d2dc656134920a8164b10184da5f8959a37c8cf9?width=236",
    },
    "3": {
      id: 3,
      name: "PASTILLA DE FRENO",
      price: "$281.000",
      type: "ORIGINAL",
      warranty: "YAMAHA - XTZ 125",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/ba45d26294a6df5720017ed2523045ff81a91013?width=290",
    },
    "4": {
      id: 4,
      name: "PASTILLA DE FRENO",
      price: "$70.000",
      type: "GENERICO",
      warranty: "YAMAHA - XTZ 125",
      image: "https://api.builder.io/api/v1/image/assets/TEMP/d18aa3f62ccfe3b68f1195acadf2e8d5bd1c1899?width=286",
    },
  };

  const product = products[id || "1"];

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen bg-partgo-hero flex items-center justify-center px-4 py-8 relative">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-8 gap-4">
          <h1
            className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold text-center flex-1"
            style={{
              fontFamily: "Montserrat",
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
              WebkitTextStroke: "1px white",
            }}
          >
            PRODUCTO
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

        {/* Product Detail Container */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-lg">
          {/* Product Name */}
          <h2
            className="text-black text-2xl font-bold text-center mb-6"
            style={{ fontFamily: "Montserrat" }}
          >
            {product.name}
          </h2>

          {/* Product Image */}
          <div className="w-full aspect-square bg-white rounded-xl shadow-md flex items-center justify-center p-6 mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Price and Badge Row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-baseline gap-2">
              <span
                className="text-black text-3xl font-semibold"
                style={{ fontFamily: "Montserrat" }}
              >
                {product.price.replace(".", ".")}
              </span>
              <span
                className="text-[#BDB6B6] text-base font-semibold"
                style={{ fontFamily: "Montserrat" }}
              >
                COP
              </span>
            </div>
            <div
              className={`px-6 py-2 rounded-full ${
                product.type === "ORIGINAL" ? "bg-[#3B9021]" : "bg-[#F52E2E]"
              }`}
            >
              <span
                className="text-white text-lg font-semibold"
                style={{ fontFamily: "Montserrat" }}
              >
                {product.type}
              </span>
            </div>
          </div>

          {/* Warranty Section */}
          <div className="flex items-center gap-3 mb-6">
            <svg
              width="27"
              height="32"
              viewBox="0 0 27 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M7.05375 19.8134H15.6487"
                stroke="#FF3C00"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                d="M7.05375 14.7333H15.6487"
                stroke="#FF3C00"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                d="M7.05375 24.9067H15.6487"
                stroke="#FF3C00"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                d="M18.8663 10.9067V30H3.83625V7.09332H15.6488L18.8663 10.9067Z"
                stroke="#FF3C00"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
              <path
                d="M18.8663 24.9067H23.1638V5.81333L19.9463 2H8.13375V7.09333"
                stroke="#FF3C00"
                strokeWidth="2"
                strokeMiterlimit="10"
              />
            </svg>
            <div>
              <p
                className="text-black text-base font-semibold"
                style={{ fontFamily: "Montserrat" }}
              >
                GARANTIA
              </p>
              <p
                className="text-[#686666] text-sm"
                style={{ fontFamily: "Montserrat" }}
              >
                {product.warranty}
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex justify-end mb-6">
            <div className="bg-white rounded-2xl shadow-md flex items-center gap-4 px-6 py-2">
              <button
                onClick={handleDecrement}
                className="text-black text-2xl font-semibold hover:text-partgo-primary transition-colors"
                style={{ fontFamily: "Montserrat" }}
              >
                <Minus className="w-5 h-5" />
              </button>
              <span
                className="text-black text-2xl font-semibold min-w-[2rem] text-center"
                style={{ fontFamily: "Montserrat" }}
              >
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="text-black text-2xl font-semibold hover:text-partgo-primary transition-colors"
                style={{ fontFamily: "Montserrat" }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="w-full bg-partgo-primary hover:bg-[#C22E0F] transition-colors text-white text-xl font-bold py-4 rounded-2xl shadow-md">
            <span style={{ fontFamily: "Montserrat" }}>
              AGREGAR AL CARRITO
            </span>
          </button>
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getUserProfile } from "@/lib/user-profile";

interface Brand {
  id: string;
  name: string;
  logo?: string;
}

const brands: Brand[] = [
  { id: "todas", name: "Todas las marcas" },
  {
    id: "akt",
    name: "AKT Motos",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/e74096cf028b0ff97ba90d10c2b6e4ac0c422920?width=72",
  },
  {
    id: "yamaha",
    name: "Yamaha",
    logo: "https://api.builder.io/api/v1/image/assets/TEMP/0c0e21567797db1e2d03c6db8f93aabad6974180?width=72",
  },
];

export default function FiltroVehiculo() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState("yamaha");
  const [searchQuery, setSearchQuery] = useState("");
  const [userAvatar, setUserAvatar] = useState(
    "https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138",
  );

  useEffect(() => {
    const profile = getUserProfile();
    if (profile && profile.avatar) {
      setUserAvatar(profile.avatar);
    }
  }, []);

  const handleApply = () => {
    // Save filter and navigate to model selection
    console.log("Selected brand:", selectedBrand);
    if (selectedBrand === "todas") {
      navigate("/menu");
    } else {
      navigate(`/filtro-modelo?brand=${selectedBrand}`);
    }
  };

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-partgo-hero flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-8">
          <h1
            className="text-white text-4xl font-semibold text-center flex-1"
            style={{
              fontFamily: "Montserrat",
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
              WebkitTextStroke: "1px white",
            }}
          >
            FILTRO DE VEHICULO
          </h1>
          <button
            onClick={() => navigate("/menu")}
            className="w-16 h-16 rounded-full border-2 border-white flex-shrink-0 hover:scale-105 transition-transform overflow-hidden bg-gray-200"
          >
            <img
              src={userAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* White Card Container */}
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar marca"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[41px] pl-12 pr-4 rounded-xl bg-[#F5F5F5] text-[#A8A4A4] text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF7A33]"
              style={{ fontFamily: "Montserrat" }}
            />
          </div>

          {/* Brand Options */}
          <div className="space-y-4 mb-6">
            {filteredBrands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className="w-full h-[49px] bg-white rounded-xl shadow-md flex items-center px-4 hover:shadow-lg transition-shadow"
              >
                {/* Logo (if exists) */}
                {brand.logo && (
                  <div
                    className="w-9 h-9 rounded-full border border-black/40 bg-cover bg-center flex-shrink-0 mr-3"
                    style={{
                      backgroundImage: `url('${brand.logo}')`,
                    }}
                  ></div>
                )}

                {/* Brand Name */}
                <span
                  className={`flex-1 text-lg text-left ${
                    brand.id === "todas" ? "font-semibold" : "font-bold"
                  }`}
                  style={{ fontFamily: "Montserrat" }}
                >
                  {brand.name}
                </span>

                {/* Radio Button */}
                <div
                  className={`w-[17px] h-[15px] rounded-full border flex-shrink-0 ${
                    selectedBrand === brand.id
                      ? "bg-[#FF3C00] border-white"
                      : "bg-white border-[#B1B0B0]"
                  }`}
                ></div>
              </button>
            ))}
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="w-full max-w-[222px] mx-auto block h-[50px] bg-[#FF3C00] rounded-xl shadow-md hover:bg-[#FF4C10] transition-colors active:scale-95"
          >
            <span
              className="text-white text-xl font-bold"
              style={{ fontFamily: "Montserrat" }}
            >
              {selectedBrand === "todas" ? "APLICAR" : "APLICAR"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

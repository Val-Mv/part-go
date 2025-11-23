import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { getUserProfile } from "@/lib/user-profile";

interface Model {
  id: string;
  name: string;
}

const modelsByBrand: Record<string, Model[]> = {
  yamaha: [
    { id: "fz150", name: "FZ150" },
    { id: "mt03-abs", name: "MT03 ABS" },
    { id: "fz25", name: "FZ25" },
    { id: "xtz125", name: "XTZ 125" },
  ],
  akt: [
    { id: "nkd", name: "NKD" },
    { id: "ttr125", name: "TTR 125" },
    { id: "ttr200", name: "TTR 200" },
    { id: "cargo", name: "CARGO" },
  ],
};

export default function FiltroModelo() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand") || "yamaha";

  const [selectedModel, setSelectedModel] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [userAvatar, setUserAvatar] = useState(
    "https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138",
  );

  const models = modelsByBrand[brand] || modelsByBrand.yamaha;

  useEffect(() => {
    const profile = getUserProfile();
    if (profile && profile.avatar) {
      setUserAvatar(profile.avatar);
    }
  }, []);

  useEffect(() => {
    // Set default selection to last model
    if (models.length > 0 && !selectedModel) {
      setSelectedModel(models[models.length - 1].id);
    }
  }, [models, selectedModel]);

  const handleCatalog = () => {
    // Save model selection and navigate to catalog
    console.log("Selected model:", selectedModel);
    navigate("/catalogo");
  };

  const filteredModels = models.filter((model) =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-partgo-hero flex flex-col items-center px-4 pt-4 pb-24 sm:py-8">
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
            onClick={() => navigate("/filtro-vehiculo")}
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
              placeholder="Buscar modelo"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[41px] pl-12 pr-4 rounded-xl bg-[#F5F5F5] text-[#A8A4A4] text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF7A33]"
              style={{ fontFamily: "Montserrat" }}
            />
          </div>

          {/* Model Options */}
          <div className="space-y-4 mb-6">
            {filteredModels.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className="w-full h-[49px] bg-white rounded-xl shadow-md flex items-center px-4 hover:shadow-lg transition-shadow"
              >
                {/* Model Name */}
                <span
                  className="flex-1 text-xl text-left font-bold"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {model.name}
                </span>

                {/* Radio Button */}
                <div
                  className={`w-[17px] h-[15px] rounded-full border flex-shrink-0 ${
                    selectedModel === model.id
                      ? "bg-[#FF3C00] border-white"
                      : "bg-white border-[#B1B0B0]"
                  }`}
                ></div>
              </button>
            ))}
          </div>

          {/* Catalog Button */}
          <button
            onClick={handleCatalog}
            className="w-full max-w-[222px] mx-auto block h-[50px] bg-[#FF3C00] rounded-xl shadow-md hover:bg-[#FF4C10] transition-colors active:scale-95"
          >
            <span
              className="text-white text-xl font-bold"
              style={{ fontFamily: "Montserrat" }}
            >
              CATALOGO
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

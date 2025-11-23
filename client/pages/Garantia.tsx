import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";
import { ProfileModal } from "@/components/ProfileModal";
import { Calendar } from "lucide-react";
import { db } from "@/lib/db";

interface Product {
  id: number;
  name: string;
  price: string;
  type: "ORIGINAL" | "GENERICO";
  image: string;
  warranty?: string;
}

export default function Garantia() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const loadProfile = () => {
    const profile = getUserProfile();
    if (profile) {
      if (profile.nombre) setUserName(profile.nombre.toUpperCase());
      if (profile.avatar) setUserAvatar(profile.avatar);
    }
  };

  const fetchProduct = async () => {
    if (!id) return;
    setLoading(true);

    // Sample product data - fallback
    const mockProducts: { [key: string]: Product } = {
      "1": {
        id: 1,
        name: "KIT DE CILINDRO",
        price: "$583.000",
        type: "ORIGINAL",
        warranty: "YAMAHA - XTZ 125",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/cdf073f1082d4432a207b254e9dd7c7d6489a4f6?width=248",
      },
      "2": {
        id: 2,
        name: "KIT DE CILINDRO",
        price: "$242.500",
        type: "GENERICO",
        warranty: "YAMAHA - XTZ 125",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/d2dc656134920a8164b10184da5f8959a37c8cf9?width=236",
      },
      "3": {
        id: 3,
        name: "PASTILLA DE FRENO",
        price: "$281.000",
        type: "ORIGINAL",
        warranty: "YAMAHA - XTZ 125",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/ba45d26294a6df5720017ed2523045ff81a91013?width=290",
      },
      "4": {
        id: 4,
        name: "PASTILLA DE FRENO",
        price: "$70.000",
        type: "GENERICO",
        warranty: "YAMAHA - XTZ 125",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/d18aa3f62ccfe3b68f1195acadf2e8d5bd1c1899?width=286",
      },
    };

    try {
      // 1. Check hardcoded/mock data first
      if (mockProducts[id]) {
        setProduct(mockProducts[id]);
        return;
      }

      // 2. Check IndexedDB
      const found = await db.getProduct(Number(id));
      if (found) {
        setProduct(found);
        return;
      }

      // 3. Try API (optional fallback)
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      }
    } catch (error) {
      console.error("Error fetching product for warranty:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    fetchProduct();
    
    // Set default dates
    const today = new Date();
    const nextYear = new Date(today);
    nextYear.setFullYear(today.getFullYear() + 1);

    setStartDate(today.toISOString().split("T")[0]);
    setEndDate(nextYear.toISOString().split("T")[0]);
  }, [id]);

  const handleLogout = () => {
    clearUserProfile();
    setShowProfileMenu(false);
    navigate("/");
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSubmitWarranty = () => {
    navigate(`/producto/${id}`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-white">Producto no encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-partgo-hero flex flex-col items-center px-4 py-4 sm:py-8 pb-24 relative">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 sm:mb-8 gap-4">
          <h1
            className="text-white text-3xl sm:text-4xl md:text-5xl font-semibold text-center flex-1"
            style={{
              fontFamily: "Montserrat",
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
              WebkitTextStroke: "1px white",
            }}
          >
            GARANTIA
          </h1>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-16 h-16 rounded-full border-2 border-white bg-cover bg-center flex-shrink-0 hover:scale-105 transition-transform"
            style={{
              backgroundImage: userAvatar
                ? `url('${userAvatar}')`
                : "url('https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138')",
            }}
          ></button>
        </div>

        {/* Main Container */}
        <div className="w-full bg-[#EDEAEA] rounded-3xl p-4 sm:p-6 shadow-lg border border-[#BEBABA]">
          {/* Start Date Section */}
          <div className="mb-6">
            <h2
              className="text-black text-lg sm:text-xl font-bold mb-3"
              style={{ fontFamily: "Montserrat" }}
            >
              COMIENZA DESDE:
            </h2>
            <label htmlFor="startDate" className="block cursor-pointer">
              <div className="bg-white rounded-2xl p-4 shadow-md border border-[#BEBABA] flex items-center justify-between relative">
                <div className="flex-1">
                  <p
                    className="text-gray-500 text-sm sm:text-base font-semibold mb-1"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    Fecha:
                  </p>
                  <p
                    className="text-black text-base sm:text-lg font-bold"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {formatDate(startDate)}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#FF6B35] flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="sr-only"
              />
            </label>
          </div>

          {/* End Date Section */}
          <div className="mb-6">
            <h2
              className="text-black text-lg sm:text-xl font-bold mb-3"
              style={{ fontFamily: "Montserrat" }}
            >
              HASTA:
            </h2>
            <label htmlFor="endDate" className="block cursor-pointer">
              <div className="bg-white rounded-2xl p-4 shadow-md border border-[#BEBABA] flex items-center justify-between relative">
                <div className="flex-1">
                  <p
                    className="text-gray-500 text-sm sm:text-base font-semibold mb-1"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    Fecha:
                  </p>
                  <p
                    className="text-black text-base sm:text-lg font-bold"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {formatDate(endDate)}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#FF6B35] flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="sr-only"
              />
            </label>
          </div>

          {/* Product Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-[#BEBABA]">
            <h3
              className="text-black text-xl sm:text-2xl font-bold text-center mb-6"
              style={{ fontFamily: "Montserrat" }}
            >
              {product.name}
            </h3>

            <div className="flex items-start gap-4 mb-6">
              {/* Product Image */}
              <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <p
                  className="text-black text-lg sm:text-xl font-semibold mb-2"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {product.price}
                </p>
                <p
                  className="text-black text-lg sm:text-xl font-semibold"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {product.type}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitWarranty}
              className="w-full bg-[#FF3C00] hover:bg-[#E63B00] transition-colors text-white text-lg sm:text-xl font-bold py-3 sm:py-4 rounded-2xl shadow-md"
            >
              <span style={{ fontFamily: "Montserrat" }}>
                SOLICITAR GARANTIA
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";
import { ProfileModal } from "@/components/ProfileModal";
import { Plus, Search, ShoppingCart } from "lucide-react";
import { db } from "@/lib/db";

interface Product {
  id: number;
  name: string;
  price: string;
  type: "ORIGINAL" | "GENERICO";
  image: string;
}

export default function Catalogo() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [userAvatar, setUserAvatar] = useState(
    "https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  const loadProfile = () => {
    const profile = getUserProfile();
    if (profile) {
      if (profile.nombre) setUserName(profile.nombre.toUpperCase());
      if (profile.avatar) setUserAvatar(profile.avatar);
    }
  };

  const fetchProducts = async () => {
    // Fallback mock data
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "KIT DE CILINDRO",
        price: "$583.000",
        type: "ORIGINAL",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/cdf073f1082d4432a207b254e9dd7c7d6489a4f6?width=248",
      },
      {
        id: 2,
        name: "KIT DE CILINDRO",
        price: "$242.500",
        type: "GENERICO",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/d2dc656134920a8164b10184da5f8959a37c8cf9?width=236",
      },
      {
        id: 3,
        name: "PASTILLA DE FRENO",
        price: "$281.000",
        type: "ORIGINAL",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/ba45d26294a6df5720017ed2523045ff81a91013?width=290",
      },
      {
        id: 4,
        name: "PASTILLA DE FRENO",
        price: "$70.000",
        type: "GENERICO",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/d18aa3f62ccfe3b68f1195acadf2e8d5bd1c1899?width=286",
      },
    ];

    try {
      // 1. Fetch from API
      let apiProducts: Product[] = [];
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          apiProducts = await response.json();
        } else {
          console.warn("API not available, using mock data");
          apiProducts = mockProducts;
        }
      } catch (error) {
        console.warn("Error fetching products, using mock data:", error);
        apiProducts = mockProducts;
      }

      // 2. Fetch from IndexedDB (custom products)
      // Migration: Move localStorage products to IndexedDB if they exist
      const storedLegacy = localStorage.getItem("custom-products");
      if (storedLegacy) {
        try {
          const legacyProducts = JSON.parse(storedLegacy);
          if (Array.isArray(legacyProducts)) {
            for (const p of legacyProducts) {
              // Avoid duplicates if possible, or just add
              // Since ID is timestamp, collision is unlikely unless re-running
              await db.addProduct(p);
            }
          }
          localStorage.removeItem("custom-products");
          console.log("Migrated custom-products to IndexedDB");
        } catch (e) {
          console.error("Migration failed", e);
        }
      }

      const localProducts = await db.getAllProducts();
      
      // 3. Merge products
      setProducts([...apiProducts, ...localProducts]);

    } catch (error) {
      console.error("Error loading products:", error);
      setProducts(mockProducts);
    }
  };

  useEffect(() => {
    loadProfile();
    fetchProducts();
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
            className="w-16 h-16 rounded-full border-2 border-white flex-shrink-0 hover:scale-105 transition-transform overflow-hidden bg-gray-200"
          >
            <img
              src={userAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* Search and Product Grid Container */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-lg">
          {/* Search Input */}
          <div className="flex gap-3 mb-6">
            <div className="relative flex-1">
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
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-4">
            {products
              .filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()),
              )
              .map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/producto/${product.id}`)}
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

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";
import { ProfileModal } from "@/components/ProfileModal";
import { addToCart } from "@/lib/cart";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/db";

interface Product {
  id: number;
  name: string;
  price: string;
  type: "ORIGINAL" | "GENERICO";
  image: string;
  warranty?: string;
}

export default function Producto() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

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

    // Mock fallback data
    const mockProducts: { [key: string]: Product } = {
      "1": {
        id: 1,
        name: "KIT DE CILINDRO",
        price: "$583.000",
        type: "ORIGINAL",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/cdf073f1082d4432a207b254e9dd7c7d6489a4f6?width=400",
        warranty: "12 meses",
      },
      "2": {
        id: 2,
        name: "KIT DE CILINDRO",
        price: "$242.500",
        type: "GENERICO",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/d2dc656134920a8164b10184da5f8959a37c8cf9?width=400",
        warranty: "6 meses",
      },
      "3": {
        id: 3,
        name: "PASTILLA DE FRENO",
        price: "$281.000",
        type: "ORIGINAL",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/ba45d26294a6df5720017ed2523045ff81a91013?width=400",
        warranty: "18 meses",
      },
      "4": {
        id: 4,
        name: "PASTILLA DE FRENO",
        price: "$70.000",
        type: "GENERICO",
        image:
          "https://api.builder.io/api/v1/image/assets/TEMP/d18aa3f62ccfe3b68f1195acadf2e8d5bd1c1899?width=400",
        warranty: "6 meses",
      },
    };

    try {
      // 1. Try fetching from API
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setProduct(data);
          return;
        }
      }

      // 2. If API fails, try IndexedDB
      try {
        const found = await db.getProduct(Number(id));
        if (found) {
          setProduct(found);
          return;
        }
      } catch (dbError) {
        console.warn("IndexedDB fetch failed:", dbError);
      }

      // 3. Use mock fallback
      const mockProduct = mockProducts[id];
      if (mockProduct) {
        console.warn("Using mock data for product:", id);
        setProduct(mockProduct);
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      // Final fallback: use first mock product
      setProduct(mockProducts["1"] || null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    fetchProduct();
  }, [id]);

  const handleLogout = () => {
    clearUserProfile();
    setShowProfileMenu(false);
    navigate("/");
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(
      { ...product, warranty: product.warranty || "Sin garantía" },
      quantity,
    );
    toast({
      title: "Producto agregado",
      description: `${product.name} (x${quantity}) agregado al carrito`,
    });
    setQuantity(1);
    navigate("/catalogo");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-partgo-hero flex items-center justify-center">
        <p className="text-white text-2xl">Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-partgo-hero flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl mb-4">Producto no encontrado</h1>
        <button
          onClick={() => navigate("/catalogo")}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-partgo-hero flex items-center justify-center px-4 py-8 relative">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-8 gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-8 h-8" />
          </button>
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
              backgroundImage: userAvatar
                ? `url('${userAvatar}')`
                : "url('https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138')",
            }}
          ></button>
        </div>

        {/* Product Detail Container */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-lg">
          {/* Product Name */}
          <div className="flex items-center justify-center mb-6">
            <h2
              className="text-black text-xl font-bold text-center"
              style={{ fontFamily: "Montserrat" }}
            >
              {product.name}
            </h2>
          </div>

          {/* Product Image */}
          <div className="w-full aspect-square bg-white rounded-xl shadow-md flex items-center justify-center p-6 mb-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Price and Badge Row */}
          <div className="flex items-center justify-between gap-3 mb-8">
            <div className="flex items-baseline gap-1 flex-shrink-0">
              <span
                className="text-black text-2xl font-semibold whitespace-nowrap"
                style={{ fontFamily: "Montserrat" }}
              >
                {product.price}
              </span>
              <span
                className="text-[#BDB6B6] text-sm font-semibold"
                style={{ fontFamily: "Montserrat" }}
              >
                COP
              </span>
            </div>
            <div
              className={`px-4 py-1.5 rounded-full flex-shrink-0 ${
                product.type === "ORIGINAL" ? "bg-[#3B9021]" : "bg-[#F52E2E]"
              }`}
            >
              <span
                className="text-white text-base font-semibold whitespace-nowrap"
                style={{ fontFamily: "Montserrat" }}
              >
                {product.type}
              </span>
            </div>
          </div>

          {/* Warranty Section */}
          <button
            onClick={() => navigate(`/garantia/${product.id}`)}
            className="flex items-center gap-3 mb-6 w-full text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
          >
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
          </button>

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
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#FF3C00] hover:bg-[#E63B00] transition-colors text-white text-xl font-bold py-4 rounded-2xl shadow-md"
          >
            <span style={{ fontFamily: "Montserrat" }}>AGREGAR AL CARRITO</span>
          </button>
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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";
import { getCart, updateCartItemQuantity, getCartTotal } from "@/lib/cart";
import { ProfileModal } from "@/components/ProfileModal";
import { Minus, Plus } from "lucide-react";
import type { CartItem } from "@/lib/cart";

export default function Carrito() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [userAvatar, setUserAvatar] = useState(
    "https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138",
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const loadProfile = () => {
    const profile = getUserProfile();
    if (profile) {
      if (profile.nombre) setUserName(profile.nombre.toUpperCase());
      if (profile.avatar) setUserAvatar(profile.avatar);
    }
  };

  const loadCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    loadProfile();
    loadCart();
  }, []);

  const handleLogout = () => {
    clearUserProfile();
    setShowProfileMenu(false);
    navigate("/");
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity);
    loadCart();
  };

  const subtotal = getCartTotal();
  const shipping = 10000;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-CO", { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="min-h-screen bg-partgo-hero flex flex-col items-center px-4 py-4 sm:py-8 relative">
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
            CARRITO
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

        {/* Cart Items */}
        <div className="w-full space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-3 sm:p-4 shadow-lg border border-[#BEBABA] flex items-center gap-3 sm:gap-4"
            >
              {/* Product Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-black text-sm sm:text-base font-bold mb-1"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {item.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className="text-black text-sm sm:text-base font-bold whitespace-nowrap"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {item.price}
                  </span>
                  <span
                    className="text-[#BDB6B6] text-xs sm:text-sm font-semibold"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    COP
                  </span>
                </div>
                <p
                  className="text-[#198C16] text-xs sm:text-sm font-semibold"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {item.type}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="bg-white rounded-2xl shadow-md flex items-center gap-2 px-3 py-1.5 sm:gap-3 sm:px-4 sm:py-2 flex-shrink-0">
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity - 1)
                  }
                  className="text-black text-sm sm:text-lg font-semibold hover:text-partgo-primary transition-colors"
                  style={{ fontFamily: "Montserrat" }}
                >
                  <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <span
                  className="text-black text-sm sm:text-lg font-semibold min-w-[1.5rem] text-center"
                  style={{ fontFamily: "Montserrat" }}
                >
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                  className="text-black text-sm sm:text-lg font-semibold hover:text-partgo-primary transition-colors"
                  style={{ fontFamily: "Montserrat" }}
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-[#BEBABA] mb-4 sm:mb-6">
          <h2
            className="text-black text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
            style={{ fontFamily: "Montserrat" }}
          >
            RESUMEN DEL PEDIDO
          </h2>

          <div className="space-y-2 sm:space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span
                className="text-[#0C0C0C] text-sm sm:text-base font-medium"
                style={{ fontFamily: "Montserrat" }}
              >
                Subtotal
              </span>
              <span
                className="text-[#262424] text-sm sm:text-base font-medium"
                style={{ fontFamily: "Montserrat" }}
              >
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between items-center">
              <span
                className="text-[#262424] text-sm sm:text-base font-medium"
                style={{ fontFamily: "Montserrat" }}
              >
                Envio
              </span>
              <span
                className="text-black text-sm sm:text-base font-medium"
                style={{ fontFamily: "Montserrat" }}
              >
                {formatPrice(shipping)}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2 sm:pt-3">
              <span
                className="text-[#262424] text-lg sm:text-xl font-bold"
                style={{ fontFamily: "Montserrat" }}
              >
                TOTAL
              </span>
              <span
                className="text-[#FF3C00] text-lg sm:text-xl font-bold"
                style={{ fontFamily: "Montserrat" }}
              >
                {formatPrice(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={() => navigate("/pagos")}
          className="w-full bg-[#FF3C00] hover:bg-[#E63B00] transition-colors text-white text-lg sm:text-xl font-bold py-3 sm:py-4 rounded-2xl shadow-md"
        >
          <span style={{ fontFamily: "Montserrat" }}>FINALIZAR COMPRA</span>
        </button>
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

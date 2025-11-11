import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";
import { getCart, updateCartItemQuantity, getCartTotal } from "@/lib/cart";
import { Minus, Plus } from "lucide-react";
import type { CartItem } from "@/lib/cart";

export default function Carrito() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const loadProfile = () => {
    const profile = getUserProfile();
    if (profile && profile.nombre) {
      setUserName(profile.nombre.toUpperCase());
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
            CARRITO
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

        {/* Cart Items */}
        <div className="w-full space-y-4 mb-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 shadow-lg border border-[#BEBABA] flex items-center gap-4"
            >
              {/* Product Image */}
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-black text-sm sm:text-base font-bold mb-1 truncate"
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
        <div className="w-full bg-white rounded-3xl p-4 sm:p-6 shadow-lg border border-[#BEBABA] mb-6">
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
        <button className="w-full bg-[#FF3C00] hover:bg-[#E63B00] transition-colors text-white text-lg sm:text-xl font-bold py-3 sm:py-4 rounded-2xl shadow-md">
          <span style={{ fontFamily: "Montserrat" }}>FINALIZAR COMPRA</span>
        </button>
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
          <div
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            onClick={(e) => e.stopPropagation()}
          >
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
                  <div
                    className="w-[30px] h-[33px] rounded-full bg-cover bg-center flex-shrink-0"
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
                  <div
                    className="w-[30px] h-[33px] rounded-full bg-cover bg-center flex-shrink-0"
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

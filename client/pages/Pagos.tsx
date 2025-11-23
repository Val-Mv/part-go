import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";
import { ProfileModal } from "@/components/ProfileModal";
import { getCartTotal, clearCart } from "@/lib/cart";
import { ArrowLeft, CreditCard, Wallet, Banknote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Pagos() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [userAvatar, setUserAvatar] = useState(
    "https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138",
  );
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const loadProfile = () => {
    const profile = getUserProfile();
    if (profile) {
      if (profile.nombre) setUserName(profile.nombre.toUpperCase());
      if (profile.avatar) setUserAvatar(profile.avatar);
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

  const subtotal = getCartTotal();
  const shipping = 10000;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("es-CO", { maximumFractionDigits: 0 })}`;
  };

  const handleConfirmPayment = () => {
    if (!selectedPayment) {
      toast({
        title: "Método de pago requerido",
        description: "Por favor selecciona un método de pago para continuar.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate payment processing
    toast({
      title: "Procesando pago...",
      description: "Estamos validando tu transacción.",
    });

    setTimeout(() => {
      clearCart();
      // Dispatch event to ensure UI updates (like floating cart button)
      window.dispatchEvent(new Event("cart-updated"));
      
      toast({
        title: "¡Compra exitosa!",
        description: "Tu pedido ha sido recibido correctamente.",
        className: "bg-green-500 text-white border-none",
      });
      
      setTimeout(() => {
        navigate("/pedidos", { state: { showTracking: true } });
      }, 2000);
    }, 2000);
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
            PAGOS
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

        {/* Payment Methods */}
        <div className="w-full space-y-4 mb-4 sm:mb-6">
          {/* Credit/Debit Card */}
          <button
            onClick={() => setSelectedPayment("card")}
            className={`w-full rounded-3xl p-4 shadow-lg flex items-center gap-4 transition-all ${
              selectedPayment === "card"
                ? "bg-white border-2 border-partgo-primary"
                : "bg-white border border-[#BEBABA] hover:bg-gray-50"
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FF6B35] flex items-center justify-center flex-shrink-0">
              <svg
                width="32"
                height="24"
                viewBox="0 0 32 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="24" rx="3" fill="white" />
                <rect x="2" y="4" width="28" height="4" fill="#D1D1D1" />
                <rect x="2" y="12" width="12" height="2" fill="#D1D1D1" />
                <rect x="2" y="16" width="8" height="2" fill="#D1D1D1" />
              </svg>
            </div>
            <span
              className="text-black text-lg sm:text-xl font-bold flex-1 text-left"
              style={{ fontFamily: "Montserrat" }}
            >
              Tarjeta de credito /Debito
            </span>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                selectedPayment === "card"
                  ? "border-partgo-primary bg-partgo-primary"
                  : "border-[#B1B0B0] bg-white"
              }`}
            ></div>
          </button>

          {/* PayPal */}
          <button
            onClick={() => setSelectedPayment("paypal")}
            className={`w-full rounded-3xl p-4 shadow-lg flex items-center gap-4 transition-all ${
              selectedPayment === "paypal"
                ? "bg-white border-2 border-partgo-primary"
                : "bg-white border border-[#BEBABA] hover:bg-gray-50"
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#FF6B35] flex items-center justify-center flex-shrink-0">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.2 9.6C25.6 6.4 23.2 4 19.6 4H10.4L7.2 24H11.6L12.8 16.8H16.4C20.8 16.8 24 14 24.8 9.6H25.2Z"
                  fill="white"
                />
                <path
                  d="M20 16C20.4 12.8 18 10.4 14.4 10.4H8.8L6.4 25.6H10.8L12 18.4H15.6C20 18.4 23.2 15.6 24 11.2"
                  fill="white"
                  fillOpacity="0.8"
                />
              </svg>
            </div>
            <span
              className="text-black text-lg sm:text-xl font-bold flex-1 text-left"
              style={{ fontFamily: "Montserrat" }}
            >
              PayPal
            </span>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                selectedPayment === "paypal"
                  ? "border-partgo-primary bg-partgo-primary"
                  : "border-[#B1B0B0] bg-white"
              }`}
            ></div>
          </button>
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

        {/* Confirm Payment Button */}
        <button
          onClick={handleConfirmPayment}
          className="w-full bg-[#FF3C00] hover:bg-[#E63B00] transition-colors text-white text-lg sm:text-xl font-bold py-3 sm:py-4 rounded-2xl shadow-md"
        >
          <span style={{ fontFamily: "Montserrat" }}>CONFIRMAR PAGO</span>
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

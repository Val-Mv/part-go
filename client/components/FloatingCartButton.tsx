import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { getCart } from "@/lib/cart";

export function FloatingCartButton() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const updateCount = () => {
    const cart = getCart();
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCount(totalItems);
  };

  useEffect(() => {
    updateCount();

    const handleStorageChange = () => {
      updateCount();
    };

    // Listen for custom event and storage event (for cross-tab sync)
    window.addEventListener("cart-updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cart-updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Hide on driver screens, login, home page, cart, payments, orders, profile, and support
  const isExcluded = 
    location.pathname === "/" || 
    location.pathname === "/login" || 
    location.pathname === "/carrito" || 
    location.pathname === "/pagos" || 
    location.pathname === "/perfil" ||
    location.pathname === "/soporte" ||
    location.pathname === "/agregar-producto" ||
    location.pathname.startsWith("/socio") ||
    location.pathname.startsWith("/pedidos");
  
  if (count === 0 || isExcluded) {
    return null;
  }

  return (
    <button
      onClick={() => navigate("/carrito")}
      className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-100 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-[0_20px_40px_rgb(0,0,0,0.2)]"
      aria-label="Ver carrito"
    >
      <div className="relative">
        <ShoppingCart className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF3C00]" strokeWidth={2} />
        <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 bg-red-500 rounded-full flex items-center justify-center shadow-sm border-2 border-white">
          <span className="text-white text-xs sm:text-sm font-bold">{count}</span>
        </div>
      </div>
    </button>
  );
}

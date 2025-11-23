import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import RecuperarContrasena from "./pages/RecuperarContrasena";
import Menu from "./pages/Menu";
import Perfil from "./pages/Perfil";
import Pedidos from "./pages/Pedidos";
import FiltroVehiculo from "./pages/FiltroVehiculo";
import FiltroModelo from "./pages/FiltroModelo";
import Catalogo from "./pages/Catalogo";
import Producto from "./pages/Producto";
import Carrito from "./pages/Carrito";
import Pagos from "./pages/Pagos";
import Garantia from "./pages/Garantia";
import Socio from "./pages/Socio";
import Soporte from "./pages/Soporte";
import NotFound from "./pages/NotFound";
import { FloatingCartButton } from "@/components/FloatingCartButton";
import AgregarProducto from "./pages/AgregarProducto";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <FloatingCartButton />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/recuperar-contrasena"
            element={<RecuperarContrasena />}
          />
          <Route path="/menu" element={<Menu />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/filtro-vehiculo" element={<FiltroVehiculo />} />
          <Route path="/filtro-modelo" element={<FiltroModelo />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/producto/:id" element={<Producto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/garantia/:id" element={<Garantia />} />
          <Route path="/socio" element={<Socio />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/agregar-producto" element={<AgregarProducto />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

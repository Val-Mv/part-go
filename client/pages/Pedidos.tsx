import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Phone } from "lucide-react";

interface Order {
  id: string;
  name: string;
  date: string;
  image: string;
}

const mockOrders: Order[] = [
  {
    id: "1",
    name: "LLANTA MICHELIN",
    date: "22/10",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/861ec5bd98c49d2882a65f889562c666d9ab76c0?width=100",
  },
  {
    id: "2",
    name: "LLANTA MICHELIN",
    date: "25/10",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/861ec5bd98c49d2882a65f889562c666d9ab76c0?width=100",
  },
  {
    id: "3",
    name: "LLANTA MICHELIN",
    date: "28/10",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/861ec5bd98c49d2882a65f889562c666d9ab76c0?width=100",
  },
];

export default function Pedidos() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"anteriores" | "actual">("actual");
  const [showTracking, setShowTracking] = useState(false);

  return (
    <div className="min-h-screen bg-partgo-hero flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-12">
          <h1
            className="text-white text-5xl font-semibold text-center flex-1"
            style={{
              fontFamily: "Montserrat",
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
              WebkitTextStroke: "1px white",
            }}
          >
            {showTracking ? "RASTREO" : "PEDIDOS"}
          </h1>
          <button
            onClick={() => navigate("/menu")}
            className="w-16 h-16 rounded-full border-2 border-white bg-cover bg-center flex-shrink-0 hover:scale-105 transition-transform"
            style={{
              backgroundImage:
                "url('https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138')",
            }}
          ></button>
        </div>

        {showTracking ? (
          /* Tracking View */
          <div className="space-y-6">
            {/* Map Container */}
            <div className="w-full aspect-[331/252] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/ff5b3f4cca2a069350bbe8a1d9ab3d458f03ff35?width=662"
                alt="Mapa de entrega"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg relative">
              {/* Vertical line connecting icon to timeline */}
              <div className="absolute left-[60px] top-[36px] bottom-0 w-1 bg-[#FF3C00] -z-0"></div>

              {/* Status Icon and Title */}
              <div className="flex items-center gap-4 mb-6 relative z-10">
                {/* Large delivery icon */}
                <div className="relative flex-shrink-0">
                  {/* Outer circle - stroke only */}
                  <div className="w-[72px] h-[72px] rounded-full border-[5px] border-[#FF3C00] flex items-center justify-center bg-transparent relative z-10">
                    {/* Inner filled circle with checkmark */}
                    <div className="w-12 h-12 rounded-full bg-[#FF3C00] border-[5px] border-[#FF3C00] flex items-center justify-center">
                      <Check className="w-6 h-6 text-white stroke-[2]" />
                    </div>
                  </div>
                </div>

                {/* Status text */}
                <h2
                  className="text-black text-xl md:text-2xl font-bold"
                  style={{ fontFamily: "Montserrat" }}
                >
                  ¡Repartidor en Camino!
                </h2>
              </div>

              {/* Driver Info Card */}
              <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-100 mb-6">
                <div className="flex items-center gap-4">
                  {/* Driver avatar */}
                  <div
                    className="w-16 h-16 md:w-20 md:h-16 rounded-full bg-cover bg-center flex-shrink-0"
                    style={{
                      backgroundImage:
                        "url('https://api.builder.io/api/v1/image/assets/TEMP/c47df31e65f4335a2cd465c10f13e3ed38883572?width=150')",
                    }}
                  ></div>

                  {/* Driver details */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="text-black text-lg font-bold mb-1"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      Carlos Martinez
                    </h3>
                    <p
                      className="text-[#717171] text-xs mb-1"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      Moto Yamaha - Placa BC12D
                    </p>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#3BD361] fill-[#3BD361]" />
                      <p
                        className="text-[#717171] text-xs"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        310 555686
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-10">
                {/* Timeline vertical line - Orange */}
                <div className="absolute left-[14px] top-0 bottom-0 w-1 bg-[#FF3C00]"></div>

                {/* Timeline items */}
                <div className="space-y-6">
                  {/* Pedido confirmado */}
                  <div className="relative flex items-center gap-4">
                    <div className="absolute -left-9 w-7 h-7 rounded-full bg-[#FF3C00] border-2 border-[#FF3C00] flex items-center justify-center z-10">
                      <Check className="w-4 h-4 text-white stroke-[3]" />
                    </div>
                    <p
                      className="text-[#A19D9D] text-base md:text-lg font-medium"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      Pedido confirmado
                    </p>
                  </div>

                  {/* Repartidor buscando el repuesto */}
                  <div className="relative flex items-center gap-4">
                    <div className="absolute -left-9 w-7 h-7 rounded-full bg-[#FF3C00] border-2 border-[#FF3C00] flex items-center justify-center z-10">
                      <Check className="w-4 h-4 text-white stroke-[3]" />
                    </div>
                    <p
                      className="text-[#A19D9D] text-base md:text-lg font-medium"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      Repartidor buscando el repuesto
                    </p>
                  </div>

                  {/* Pedido entregado */}
                  <div className="relative flex items-center gap-4">
                    <div className="absolute -left-9 w-7 h-7 rounded-full bg-[#FF3C00] border-2 border-[#FF3C00] flex items-center justify-center z-10"></div>
                    <p
                      className="text-[#A19D9D] text-base md:text-lg font-medium"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      Pedido entregado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setShowTracking(false)}
              className="text-white text-lg font-semibold hover:underline"
              style={{ fontFamily: "Montserrat" }}
            >
              ← Volver
            </button>
          </div>
        ) : activeTab === "actual" ? (
          /* Tab Selection View */
          <div className="space-y-6">
            {/* Anteriores Button - Rounded pill with icon */}
            <button
              onClick={() => setActiveTab("anteriores")}
              className="w-full h-[61px] bg-white rounded-full shadow-md hover:shadow-lg transition-shadow active:scale-98 flex items-center justify-center gap-4"
            >
              {/* Icon on left - Box with arrow (Anteriores) */}
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F343e950f5ef34d4b9b0833007fadef2a%2F378659a9f53942b1ab699d2dd0abcf76?format=webp&width=128"
                alt="Anteriores"
                className="w-12 h-12 object-contain flex-shrink-0"
              />

              {/* Text */}
              <span
                className="text-black text-2xl font-medium"
                style={{ fontFamily: "Montserrat" }}
              >
                ANTERIORES
              </span>
            </button>

            {/* Actual Button - Rounded pill with icon */}
            <button
              onClick={() => setShowTracking(true)}
              className="w-full h-[61px] bg-white rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-4"
            >
              {/* Icon on left - Shopping cart with check (Actual) */}
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F343e950f5ef34d4b9b0833007fadef2a%2Faeddaa666fd740969e40d87e51ddcba9?format=webp&width=128"
                alt="Actual"
                className="w-12 h-12 object-contain flex-shrink-0"
              />

              {/* Text */}
              <span
                className="text-black text-2xl font-medium"
                style={{ fontFamily: "Montserrat" }}
              >
                ACTUAL
              </span>
            </button>
          </div>
        ) : (
          /* Orders List View */
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="w-full h-[58px] bg-white rounded-xl flex items-center px-3 shadow-md"
              >
                {/* Order Image */}
                <div
                  className="w-[50px] h-[50px] rounded-full bg-cover bg-center flex-shrink-0"
                  style={{
                    backgroundImage: `url('${order.image}')`,
                  }}
                ></div>

                {/* Order Info */}
                <div className="flex-1 ml-4">
                  <h3
                    className="text-black text-xl font-bold"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {order.name}
                  </h3>
                  <p
                    className="text-[#756B6B] text-sm font-normal"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    Entregado - {order.date}
                  </p>
                </div>
              </div>
            ))}

            {/* Back Button */}
            <button
              onClick={() => setActiveTab("actual")}
              className="mt-6 text-white text-lg font-semibold hover:underline"
              style={{ fontFamily: "Montserrat" }}
            >
              ← Volver
            </button>
          </div>
        )}

        {/* Logo */}
        <div className="w-full flex justify-center mt-auto pt-12">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/38f11cae9061bf779f409ccd300b88f0a804aeaf?width=570"
            alt="PartGo Logo"
            className="w-64 h-auto"
          />
        </div>
      </div>
    </div>
  );
}

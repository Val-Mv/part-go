import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, Phone, Bike } from "lucide-react";
import { getUserProfile } from "@/lib/user-profile";

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
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"anteriores" | "actual">("actual");
  const [showTracking, setShowTracking] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Confirmado, 1: Buscando, 2: Entregado
  const [driverProgress, setDriverProgress] = useState(0);
  const [userAvatar, setUserAvatar] = useState(
    "https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138",
  );

  useEffect(() => {
    const profile = getUserProfile();
    if (profile && profile.avatar) {
      setUserAvatar(profile.avatar);
    }
  }, []);

  useEffect(() => {
    if (showTracking) {
      setCurrentStep(0);
      setDriverProgress(0);

      const totalDuration = 10000; // 10 seconds simulation
      const startTime = Date.now();

      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        setDriverProgress(progress);

        if (progress < 0.1) {
          setCurrentStep(0);
        } else if (progress < 1) {
          setCurrentStep(1);
        } else {
          setCurrentStep(2);
        }

        if (progress >= 1) clearInterval(interval);
      }, 50);

      return () => clearInterval(interval);
    }
  }, [showTracking]);

  useEffect(() => {
    if (location.state?.showTracking) {
      setShowTracking(true);
      // Clear state to avoid reopening tracking on refresh if desired, 
      // but react-router state persists on refresh usually. 
      // We can leave it or clear it. For now, let's just set it.
    }
  }, [location.state]);

  // Puntos de la ruta para seguir la línea punteada (ajustados para seguir las calles)
  const pathPoints = [
    { x: 88, y: 82 }, // Inicio (Camión)
    { x: 78, y: 70 },
    { x: 68, y: 60 },
    { x: 55, y: 52 },
    { x: 42, y: 42 },
    { x: 30, y: 30 },
    { x: 18, y: 20 },
    { x: 12, y: 14 }, // Fin (Casa)
  ];

  const totalSegments = pathPoints.length - 1;
  let segmentIndex = Math.floor(driverProgress * totalSegments);
  let segmentProgress = driverProgress * totalSegments - segmentIndex;

  if (segmentIndex >= totalSegments) {
    segmentIndex = totalSegments - 1;
    segmentProgress = 1;
  }

  const startPoint = pathPoints[segmentIndex];
  const endPoint = pathPoints[segmentIndex + 1];

  const driverX = startPoint.x + (endPoint.x - startPoint.x) * segmentProgress;
  const driverY = startPoint.y + (endPoint.y - startPoint.y) * segmentProgress;

  // Calcular rotación para que la moto mire hacia adelante
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const rotation = Math.atan2(dy, dx) * (180 / Math.PI);

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
            className="w-16 h-16 rounded-full border-2 border-white flex-shrink-0 hover:scale-105 transition-transform overflow-hidden bg-gray-200"
          >
            <img
              src={userAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {showTracking ? (
          /* Tracking View */
          <div className="space-y-6">
            {/* Map Container */}
            <div className="w-full aspect-[331/252] rounded-2xl overflow-hidden shadow-lg relative">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/ff5b3f4cca2a069350bbe8a1d9ab3d458f03ff35?width=662"
                alt="Mapa de entrega"
                className="w-full h-full object-cover"
              />
              {/* Driver Marker */}
              <div
                className="absolute w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-75 ease-linear z-10"
                style={{
                  left: `${driverX}%`,
                  top: `${driverY}%`,
                  transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                }}
              >
                <Bike className="w-5 h-5 text-[#FF3C00]" />
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg relative">
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
                  {currentStep === 0
                    ? "Pedido Confirmado"
                    : currentStep === 1
                      ? "¡Repartidor en Camino!"
                      : "Pedido Entregado"}
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
              <div className="pl-4">
                <div className="flex flex-col">
                  {/* Pedido confirmado */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full border-2 border-[#FF3C00] flex items-center justify-center z-10 shrink-0 ${
                          currentStep >= 0 ? "bg-[#FF3C00]" : "bg-white"
                        }`}
                      >
                        {currentStep >= 0 && (
                          <Check className="w-4 h-4 text-white stroke-[3]" />
                        )}
                      </div>
                      <div
                        className={`w-1 flex-grow min-h-[2rem] ${
                          currentStep >= 1 ? "bg-[#FF3C00]" : "bg-gray-200"
                        }`}
                      ></div>
                    </div>
                    <div className="pb-8 pt-0.5">
                      <p
                        className={`text-base md:text-lg font-medium ${
                          currentStep >= 0 ? "text-black" : "text-[#A19D9D]"
                        }`}
                        style={{ fontFamily: "Montserrat" }}
                      >
                        Pedido confirmado
                      </p>
                    </div>
                  </div>

                  {/* Repartidor buscando el repuesto */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full border-2 border-[#FF3C00] flex items-center justify-center z-10 shrink-0 ${
                          currentStep >= 1 ? "bg-[#FF3C00]" : "bg-white"
                        }`}
                      >
                        {currentStep >= 1 && (
                          <Check className="w-4 h-4 text-white stroke-[3]" />
                        )}
                      </div>
                      <div
                        className={`w-1 flex-grow min-h-[2rem] ${
                          currentStep >= 2 ? "bg-[#FF3C00]" : "bg-gray-200"
                        }`}
                      ></div>
                    </div>
                    <div className="pb-8 pt-0.5">
                      <p
                        className={`text-base md:text-lg font-medium ${
                          currentStep >= 1 ? "text-black" : "text-[#A19D9D]"
                        }`}
                        style={{ fontFamily: "Montserrat" }}
                      >
                        Repartidor buscando el repuesto
                      </p>
                    </div>
                  </div>

                  {/* Pedido entregado */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-7 h-7 rounded-full border-2 border-[#FF3C00] flex items-center justify-center z-10 shrink-0 ${
                          currentStep >= 2 ? "bg-[#FF3C00]" : "bg-white"
                        }`}
                      >
                        {currentStep >= 2 && (
                          <Check className="w-4 h-4 text-white stroke-[3]" />
                        )}
                      </div>
                    </div>
                    <div className="pt-0.5">
                      <p
                        className={`text-base md:text-lg font-medium ${
                          currentStep >= 2 ? "text-black" : "text-[#A19D9D]"
                        }`}
                        style={{ fontFamily: "Montserrat" }}
                      >
                        Pedido entregado
                      </p>
                    </div>
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

     
      </div>
    </div>
  );
}

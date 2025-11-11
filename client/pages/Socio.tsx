import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Truck, Check } from "lucide-react";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";

type Order = {
  id: string;
  customerName: string;
  customerAvatar?: string;
  customerInitial?: string;
  pickupLocation: string;
  deliveryLocation: string;
  status?: "recogiendo" | "entregando" | "entregado";
};

export default function Socio() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState<"nuevoPedido" | "enCurso">(
    "nuevoPedido",
  );

  const loadProfile = () => {
    const profile = getUserProfile();
    if (profile && profile.nombre) {
      setUserName(profile.nombre.toUpperCase());
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

  // Mock orders data
  const newOrders: Order[] = [
    {
      id: "PRT-2025-006",
      customerName: "Ana Gómez",
      customerAvatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/ae72dc7cf58d4e99cb25ab8181fa2a3dcb43076f?width=80",
      pickupLocation: "Taller central",
      deliveryLocation: "Av. 20 #35 - 40",
    },
    {
      id: "PRT-2025-007",
      customerName: "Francisco Rojas",
      customerInitial: "F",
      pickupLocation: "Taller De Pedro",
      deliveryLocation: "Cra. 19 #35 - 40",
    },
  ];

  const ordersInProgress: Order[] = [
    {
      id: "PRT-2025-006",
      customerName: "Ana Gómez",
      customerAvatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/70fdcc8105ac031d771619967b2bb7b6735af8e4?width=80",
      pickupLocation: "Taller central",
      deliveryLocation: "Av. 20 #35 - 40",
      status: "recogiendo",
    },
  ];

  const handleAcceptOrder = (orderId: string) => {
    console.log("Order accepted:", orderId);
  };

  const handleRejectOrder = (orderId: string) => {
    console.log("Order rejected:", orderId);
  };

  const handleUpdateStatus = (orderId: string) => {
    console.log("Update status for order:", orderId);
  };

  const handleViewMap = (orderId: string) => {
    console.log("View map for order:", orderId);
  };

  return (
    <div className="min-h-screen bg-partgo-hero flex flex-col">
      {/* Header */}
      <div className="px-4 sm:px-6 py-6 flex items-center justify-between">
        <h1
          className="text-white text-3xl sm:text-4xl font-semibold"
          style={{
            fontFamily: "Montserrat",
            textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
            WebkitTextStroke: "1px white",
          }}
        >
          REPARTIDOR
        </h1>
        <button
          onClick={() => setShowProfileMenu(true)}
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-white flex-shrink-0 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://api.builder.io/api/v1/image/assets/TEMP/93f6caefbcf31077d0168431256f02dbf5b353b2?width=139')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      {/* Availability Toggle */}
      <div className="px-4 sm:px-6 mb-6">
        <button
          onClick={() => setIsAvailable(!isAvailable)}
          className={`flex items-center gap-3 ${
            isAvailable ? "" : "opacity-50"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isAvailable ? "bg-[#31AA27]" : "bg-gray-400"
            }`}
          >
            <Check className="w-5 h-5 text-white" />
          </div>
          <span
            className="text-white text-sm sm:text-base font-semibold"
            style={{ fontFamily: "Montserrat" }}
          >
            Disponible para recibir pedidos
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 sm:px-6 pb-6">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg max-w-2xl mx-auto min-h-[500px]">
          {/* Tabs */}
          <div className="flex items-center justify-center gap-8 mb-6">
            <button
              onClick={() => setActiveTab("nuevoPedido")}
              className="relative"
            >
              <span
                className={`text-lg sm:text-xl font-semibold ${
                  activeTab === "nuevoPedido" ? "text-black" : "text-[#A8A6A6]"
                }`}
                style={{ fontFamily: "Montserrat" }}
              >
                NUEVO PEDIDO
              </span>
              {activeTab === "nuevoPedido" && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("enCurso")}
              className="relative"
            >
              <span
                className={`text-lg sm:text-xl font-semibold ${
                  activeTab === "enCurso" ? "text-black" : "text-[#A8A6A6]"
                }`}
                style={{ fontFamily: "Montserrat" }}
              >
                EN CURSO
              </span>
              {activeTab === "enCurso" && (
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-black" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 mt-8">
            {activeTab === "nuevoPedido" && (
              <>
                {newOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
                  >
                    {/* Order ID */}
                    <h3
                      className="text-black text-base sm:text-lg font-bold mb-4"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      #{order.id}
                    </h3>

                    {/* Customer Info */}
                    <div className="flex items-center gap-3 mb-4">
                      {order.customerAvatar ? (
                        <img
                          src={order.customerAvatar}
                          alt={order.customerName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#2C2C2C] flex items-center justify-center">
                          <span
                            className="text-white text-lg font-semibold"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {order.customerInitial}
                          </span>
                        </div>
                      )}
                      <span
                        className="text-black text-base font-bold"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        {order.customerName}
                      </span>

                      {/* Truck Icon */}
                      <div className="ml-auto w-10 h-10 rounded-full bg-[#F5F5F5] shadow flex items-center justify-center">
                        <Truck
                          className="w-6 h-6 text-[#FF3C00]"
                          strokeWidth={2.5}
                        />
                      </div>
                    </div>

                    {/* Locations */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <MapPin
                          className="w-6 h-6 text-[#FF3C00]"
                          strokeWidth={2.5}
                        />
                        <span
                          className="text-black text-sm sm:text-base"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          <span className="font-bold">Recoger:</span>{" "}
                          {order.pickupLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin
                          className="w-6 h-6 text-[#31AA27]"
                          strokeWidth={2.5}
                        />
                        <span
                          className="text-black text-sm sm:text-base"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          <span className="font-bold">Entregar:</span>{" "}
                          {order.deliveryLocation}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleRejectOrder(order.id)}
                        className="flex-1 h-11 rounded-2xl border border-[#FF3C00] bg-white hover:bg-gray-50 transition-colors shadow"
                      >
                        <span
                          className="text-[#FF3C00] text-base font-bold"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          RECHAZAR
                        </span>
                      </button>
                      <button
                        onClick={() => handleAcceptOrder(order.id)}
                        className="flex-1 h-11 rounded-2xl bg-[#FF3C00] hover:bg-[#E63B00] transition-colors shadow"
                      >
                        <span
                          className="text-white text-base font-bold"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          ACEPTAR
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === "enCurso" && (
              <>
                {ordersInProgress.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100"
                  >
                    {/* Order ID */}
                    <h3
                      className="text-black text-base sm:text-lg font-bold mb-4"
                      style={{ fontFamily: "Montserrat" }}
                    >
                      #{order.id}
                    </h3>

                    {/* Status Progress */}
                    <div className="flex items-center gap-2 mb-4">
                      {/* Recogiendo */}
                      <div className="relative flex items-center">
                        <div className="w-5 h-5 rounded-full bg-[#FF3C00] shadow flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <span
                        className="text-[#FF3C00] text-xs font-semibold"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        Recogiendo
                      </span>

                      {/* Connector */}
                      <div className="flex-1 h-px bg-[#D2D2D2]" />

                      {/* En camino */}
                      <div className="w-5 h-5 rounded-full border-2 border-[#D2D2D2] bg-white" />

                      {/* Connector */}
                      <div className="flex-1 h-px bg-[#D2D2D2]" />

                      {/* Entregado */}
                      <div className="w-5 h-5 rounded-full border-2 border-[#D2D2D2] bg-white" />
                    </div>

                    {/* Customer Info */}
                    <div className="flex items-center gap-3 mb-4">
                      {order.customerAvatar ? (
                        <img
                          src={order.customerAvatar}
                          alt={order.customerName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#2C2C2C] flex items-center justify-center">
                          <span
                            className="text-white text-lg font-semibold"
                            style={{ fontFamily: "Montserrat" }}
                          >
                            {order.customerInitial}
                          </span>
                        </div>
                      )}
                      <span
                        className="text-black text-base font-bold"
                        style={{ fontFamily: "Montserrat" }}
                      >
                        {order.customerName}
                      </span>
                    </div>

                    {/* Locations */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <MapPin
                          className="w-6 h-6 text-[#FF3C00]"
                          strokeWidth={2.5}
                        />
                        <span
                          className="text-black text-sm sm:text-base"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          <span className="font-bold">Recoger:</span>{" "}
                          {order.pickupLocation}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin
                          className="w-6 h-6 text-[#31AA27]"
                          strokeWidth={2.5}
                        />
                        <span
                          className="text-black text-sm sm:text-base"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          <span className="font-bold">Entregar:</span>{" "}
                          {order.deliveryLocation}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleUpdateStatus(order.id)}
                        className="w-full h-11 rounded-2xl bg-[#FF3C00] hover:bg-[#E63B00] transition-colors shadow"
                      >
                        <span
                          className="text-white text-base font-bold"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          ACTUALIZA ESTADO
                        </span>
                      </button>
                      <button
                        onClick={() => handleViewMap(order.id)}
                        className="w-full h-11 rounded-2xl border border-[#FF3C00] bg-white hover:bg-gray-50 transition-colors shadow"
                      >
                        <span
                          className="text-[#FF3C00] text-base font-bold"
                          style={{ fontFamily: "Montserrat" }}
                        >
                          VER MAPA
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
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
                      "url('https://api.builder.io/api/v1/image/assets/TEMP/93f6caefbcf31077d0168431256f02dbf5b353b2?width=139')",
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
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/soporte");
                  }}
                  className="w-full flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
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

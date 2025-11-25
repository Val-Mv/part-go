import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Bike,
  X,
  Check,
  Truck,
} from "lucide-react";
import { getUserProfile, clearUserProfile } from "@/lib/user-profile";
import { ProfileModal } from "@/components/ProfileModal";
import MapComponent from "@/components/MapComponent";

type Order = {
  id: string;
  customerName: string;
  customerAvatar?: string;
  customerInitial?: string;
  pickupLocation: string;
  pickupAddress: string;
  deliveryLocation: string;
  deliveryAddress: string;
  status?: "recogiendo" | "entregando" | "entregado";
  pickupCoords?: { lat: number; lng: number };
  deliveryCoords?: { lat: number; lng: number };
};

export default function Socio() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("ALEX MANCIPE");
  const [userAvatar, setUserAvatar] = useState(
    "https://api.builder.io/api/v1/image/assets/TEMP/93f6caefbcf31077d0168431256f02dbf5b353b2?width=139",
  );
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState<"nuevoPedido" | "enCurso">(
    "nuevoPedido",
  );
  const [showDeliveryTracking, setShowDeliveryTracking] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState<
    "recogida" | "camino" | "entregado"
  >("recogida");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<
    "recogida" | "camino" | "entregado" | null
  >(null);
  const [driverProgress, setDriverProgress] = useState(0);

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

  // Mock orders data
  const newOrders: Order[] = [
    {
      id: "PRT-2025-006",
      customerName: "Ana Gómez",
      customerAvatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/ae72dc7cf58d4e99cb25ab8181fa2a3dcb43076f?width=80",
      pickupLocation: "Taller central",
      pickupAddress: "Calle 5 # 100 -15",
      deliveryLocation: "Av. 20 #35 - 40",
      deliveryAddress: "Av. 20 #35 - 40",
      pickupCoords: { lat: 4.6150, lng: -74.0850 },
      deliveryCoords: { lat: 4.6050, lng: -74.0750 },
    },
    {
      id: "PRT-2025-007",
      customerName: "Francisco Rojas",
      customerInitial: "F",
      pickupLocation: "Taller De Pedro",
      pickupAddress: "Calle 10 # 200 -30",
      deliveryLocation: "Cra. 19 #35 - 40",
      deliveryAddress: "Cra. 19 #35 - 40",
      pickupCoords: { lat: 4.6180, lng: -74.0880 },
      deliveryCoords: { lat: 4.6020, lng: -74.0720 },
    },
  ];

  const ordersInProgress: Order[] = [
    {
      id: "PRT-2025-006",
      customerName: "Ana Gómez",
      customerAvatar:
        "https://api.builder.io/api/v1/image/assets/TEMP/70fdcc8105ac031d771619967b2bb7b6735af8e4?width=80",
      pickupLocation: "Taller central",
      pickupAddress: "Calle 5 # 100 -15",
      deliveryLocation: "Av. 20 #35 - 40",
      deliveryAddress: "Av. 20 #35 - 40",
      status: "recogiendo",
      pickupCoords: { lat: 4.6150, lng: -74.0850 },
      deliveryCoords: { lat: 4.6050, lng: -74.0750 },
    },
  ];

  const handleAcceptOrder = (order: Order) => {
    setSelectedOrder(order);
    setDeliveryStatus("recogida");
    setShowDeliveryTracking(true);
  };

  const handleRejectOrder = (orderId: string) => {
    console.log("Order rejected:", orderId);
  };

  const handleUpdateStatus = (orderId: string) => {
    console.log("Update status for order:", orderId);
  };

  const handleViewMap = (order: Order) => {
    setSelectedOrder(order);
    setDeliveryStatus("recogida");
    setShowDeliveryTracking(true);
  };

  const handleStatusChange = (status: "recogida" | "camino" | "entregado") => {
    if (status === deliveryStatus) return;
    setPendingStatus(status);
    setShowConfirmModal(true);
  };

  const confirmStatusChange = () => {
    if (pendingStatus) {
      setDeliveryStatus(pendingStatus);
      setShowConfirmModal(false);
      setPendingStatus(null);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (deliveryStatus === "camino") {
      const totalDuration = 10000; // 10 seconds for full path
      const startTime = Date.now();
      setDriverProgress(0);

      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / totalDuration;

        if (progress >= 1) {
          setDriverProgress(1);
          clearInterval(interval);
        } else {
          setDriverProgress(progress);
        }
      }, 50);
    } else if (deliveryStatus === "recogida") {
      setDriverProgress(0);
    } else if (deliveryStatus === "entregado") {
      setDriverProgress(1);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [deliveryStatus]);

  // Puntos de la ruta para seguir la línea punteada (ajustados para seguir las calles)
  const pathPoints = [
    { x: 12, y: 14 }, // Inicio (Punto Naranja)
    { x: 18, y: 20 },
    { x: 30, y: 30 },
    { x: 42, y: 42 },
    { x: 55, y: 52 },
    { x: 68, y: 60 },
    { x: 78, y: 70 },
    { x: 88, y: 82 }, // Fin (Casa)
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

  // Calcular rotación
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const rotation = Math.atan2(dy, dx) * (180 / Math.PI);

  if (showDeliveryTracking && selectedOrder) {
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
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-white flex-shrink-0 overflow-hidden bg-gray-200"
          >
            <img
              src={userAvatar}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* Main Content Card */}
        <div className="flex-1 px-4 sm:px-6 pb-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg max-w-2xl mx-auto">
            {/* Order Number */}
            <h2
              className="text-black text-center text-xl font-bold mb-6"
              style={{ fontFamily: "Montserrat" }}
            >
              PEDIDO: #{selectedOrder.id}
            </h2>

            {/* Map */}
            <div className="w-full aspect-[344/182] rounded-2xl overflow-hidden mb-6 shadow relative z-0">
              <MapComponent 
                pickupLocation={selectedOrder.pickupCoords}
                deliveryLocation={selectedOrder.deliveryCoords}
                showDirections={deliveryStatus === "camino"}
              />
            </div>

            {/* Client Name */}
            <h3
              className="text-black text-base font-bold mb-6"
              style={{ fontFamily: "Montserrat" }}
            >
              Cliente: {selectedOrder.customerName}
            </h3>

            {/* Locations */}
            <div className="space-y-4 mb-8">
              {/* Pickup Location */}
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-6 h-6 text-[#FF3C00] flex-shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <div className="flex-1">
                  <p
                    className="text-black text-sm font-bold mb-1"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    Recoger
                  </p>
                  <p
                    className="text-black text-sm font-normal"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {selectedOrder.pickupLocation},{" "}
                    {selectedOrder.pickupAddress}
                  </p>
                  <div className="h-px bg-[#D2D2D2] mt-2"></div>
                </div>
              </div>

              {/* Delivery Location */}
              <div className="flex items-start gap-3">
                <MapPin
                  className="w-6 h-6 text-[#31AA27] flex-shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <div className="flex-1">
                  <p
                    className="text-black text-sm font-bold mb-1"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    Entregar
                  </p>
                  <p
                    className="text-black text-sm font-normal"
                    style={{ fontFamily: "Montserrat" }}
                  >
                    {selectedOrder.deliveryAddress}
                  </p>
                  <div className="h-px bg-[#D2D2D2] mt-2"></div>
                </div>
              </div>
            </div>

            {/* Status Buttons */}
            <div className="space-y-3 mb-6">
              {/* En el punto de recogida - Filled */}
              <button
                onClick={() => handleStatusChange("recogida")}
                className={`w-full h-11 rounded-2xl shadow transition-all ${
                  deliveryStatus === "recogida"
                    ? "bg-[#FF3C00]"
                    : "bg-white border border-[#FF3C00]"
                }`}
              >
                <span
                  className={`text-base font-bold ${
                    deliveryStatus === "recogida"
                      ? "text-white"
                      : "text-[#FF3C00]"
                  }`}
                  style={{ fontFamily: "Montserrat" }}
                >
                  EN EL PUNTO DE RECOGIDA
                </span>
              </button>

              {/* Pedido en camino - Outline */}
              <button
                onClick={() => handleStatusChange("camino")}
                className={`w-full h-11 rounded-2xl shadow transition-all ${
                  deliveryStatus === "camino"
                    ? "bg-[#FF3C00]"
                    : "bg-white border border-[#FF3C00]"
                }`}
              >
                <span
                  className={`text-base font-bold ${
                    deliveryStatus === "camino"
                      ? "text-white"
                      : "text-[#FF3C00]"
                  }`}
                  style={{ fontFamily: "Montserrat" }}
                >
                  PEDIDO EN CAMINO
                </span>
              </button>

              {/* Entregado - Green */}
              <button
                onClick={() => handleStatusChange("entregado")}
                className={`w-full h-11 rounded-2xl shadow transition-all ${
                  deliveryStatus === "entregado"
                    ? "bg-[#31AA27]"
                    : "bg-white border border-[#31AA27]"
                }`}
              >
                <span
                  className={`text-base font-bold ${
                    deliveryStatus === "entregado"
                      ? "text-white"
                      : "text-[#31AA27]"
                  }`}
                  style={{ fontFamily: "Montserrat" }}
                >
                  ENTREGADO
                </span>
              </button>
            </div>

            {/* Back Button */}
            <button
              onClick={() => setShowDeliveryTracking(false)}
              className="text-[#FF3C00] text-sm font-semibold hover:underline"
              style={{ fontFamily: "Montserrat" }}
            >
              ← Volver
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3
                  className="text-xl font-bold text-black"
                  style={{ fontFamily: "Montserrat" }}
                >
                  Confirmar Cambio
                </h3>
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
              <p
                className="text-gray-600 mb-6"
                style={{ fontFamily: "Montserrat" }}
              >
                ¿Estás seguro de que deseas cambiar el estado del pedido a "
                {pendingStatus === "recogida"
                  ? "En punto de recogida"
                  : pendingStatus === "camino"
                    ? "En camino"
                    : "Entregado"}
                "?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50"
                  style={{ fontFamily: "Montserrat" }}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmStatusChange}
                  className="flex-1 py-3 rounded-xl bg-[#FF3C00] text-white font-semibold hover:bg-[#E63B00]"
                  style={{ fontFamily: "Montserrat" }}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

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
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-full border border-white flex-shrink-0 overflow-hidden bg-gray-200"
        >
          <img
            src={userAvatar}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </button>
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
                        onClick={() => handleAcceptOrder(order)}
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
                        onClick={() => handleViewMap(order)}
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

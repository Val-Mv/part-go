import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    image: "https://api.builder.io/api/v1/image/assets/TEMP/861ec5bd98c49d2882a65f889562c666d9ab76c0?width=100",
  },
  {
    id: "2",
    name: "LLANTA MICHELIN",
    date: "25/10",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/861ec5bd98c49d2882a65f889562c666d9ab76c0?width=100",
  },
  {
    id: "3",
    name: "LLANTA MICHELIN",
    date: "28/10",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/861ec5bd98c49d2882a65f889562c666d9ab76c0?width=100",
  },
];

export default function Pedidos() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"anteriores" | "actual">("actual");
  const [userName, setUserName] = useState("ALEX MANCIPE");

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
            PEDIDOS
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

        {activeTab === "actual" ? (
          /* Tab Selection View */
          <div className="space-y-6">
            {/* Anteriores Button - SVG Pill shape with icon */}
            <button
              onClick={() => setActiveTab("anteriores")}
              className="w-full h-[61px] relative shadow-md hover:shadow-lg transition-shadow active:scale-98"
            >
              {/* White background pill */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 294 61"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 30.5C0 13.6553 13.6553 0 30.5 0H263.5C280.345 0 294 13.6553 294 30.5C294 47.3447 280.345 61 263.5 61H30.5C13.6553 61 0 47.3447 0 30.5Z"
                  fill="white"
                />
              </svg>

              {/* Icon on left - Box with arrow (Anteriores) */}
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-16 h-[61px]"
                width="64"
                height="61"
                viewBox="0 0 64 61"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="32" cy="30.5" rx="32" ry="30.5" fill="url(#pattern_anteriores)" />
                <defs>
                  <pattern
                    id="pattern_anteriores"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image_anteriores"
                      transform="matrix(0.00186157 0 0 0.00195312 -0.337708 0)"
                    />
                  </pattern>
                  <image
                    id="image_anteriores"
                    width="900"
                    height="512"
                    xlinkHref="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M50 15L30 8L10 15v18c0 12 8 23 20 28 12-5 20-16 20-28V15z' fill='none' stroke='black' stroke-width='2'/%3E%3Cpath d='M32 25L42 35M32 25L22 35M32 25v20' stroke='black' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E"
                  />
                </defs>
              </svg>

              {/* Text */}
              <span
                className="relative text-black text-2xl font-medium text-center block"
                style={{ fontFamily: "Montserrat" }}
              >
                ANTERIORES
              </span>
            </button>

            {/* Actual Button - SVG Pill shape with icon */}
            <button
              onClick={() => {}}
              className="w-full h-[61px] relative shadow-md hover:shadow-lg transition-shadow"
            >
              {/* White background pill */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 294 61"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 30.5C0 13.6553 13.6553 0 30.5 0H263.5C280.345 0 294 13.6553 294 30.5C294 47.3447 280.345 61 263.5 61H30.5C13.6553 61 0 47.3447 0 30.5Z"
                  fill="white"
                />
              </svg>

              {/* Icon on left - Shopping cart with check (Actual) */}
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-16 h-[61px]"
                width="64"
                height="61"
                viewBox="0 0 64 61"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse cx="32" cy="30.5" rx="32" ry="30.5" fill="url(#pattern_actual)" />
                <defs>
                  <pattern
                    id="pattern_actual"
                    patternContentUnits="objectBoundingBox"
                    width="1"
                    height="1"
                  >
                    <use
                      xlinkHref="#image_actual"
                      transform="matrix(0.00125 0 0 0.00131148 0 -0.0245902)"
                    />
                  </pattern>
                  <image
                    id="image_actual"
                    width="800"
                    height="800"
                    xlinkHref="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cpath d='M10 10h8l8 32h24l6-16H20' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Ccircle cx='28' cy='52' r='3' fill='black'/%3E%3Ccircle cx='48' cy='52' r='3' fill='black'/%3E%3Ccircle cx='38' cy='20' r='12' fill='white' stroke='black' stroke-width='2'/%3E%3Cpath d='M33 20l3 4 6-8' stroke='black' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
                  />
                </defs>
              </svg>

              {/* Text */}
              <span
                className="relative text-black text-2xl font-medium text-center block"
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

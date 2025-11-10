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
            {/* Anteriores Button */}
            <button
              onClick={() => setActiveTab("anteriores")}
              className="w-full h-[61px] bg-white rounded-[30px] flex items-center gap-4 px-4 shadow-md hover:shadow-lg transition-all active:scale-98"
            >
              <div
                className="w-16 h-[61px] rounded-full bg-cover bg-center flex-shrink-0"
                style={{
                  backgroundImage:
                    "url('https://api.builder.io/api/v1/image/assets/TEMP/41cc57a412a0ecb7e173d2008b46a3ec20ae147f?width=312')",
                  backgroundSize: "contain",
                }}
              ></div>
              <span
                className="text-black text-2xl font-medium flex-1 text-center"
                style={{ fontFamily: "Montserrat" }}
              >
                ANTERIORES
              </span>
            </button>

            {/* Actual Button */}
            <button
              onClick={() => {}}
              className="w-full h-[61px] bg-white rounded-[30px] flex items-center gap-4 px-4 shadow-md hover:shadow-lg transition-all"
            >
              <div
                className="w-16 h-[61px] rounded-full bg-cover bg-center flex-shrink-0"
                style={{
                  backgroundImage:
                    "url('https://api.builder.io/api/v1/image/assets/TEMP/4c34988cca03487ce380295f5cea2f14cba53d44?width=312')",
                  backgroundSize: "contain",
                }}
              ></div>
              <span
                className="text-black text-2xl font-medium flex-1 text-center"
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

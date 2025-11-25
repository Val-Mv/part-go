import { useNavigate } from "react-router-dom";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userAvatar: string | null;
  onLogout: () => void;
}

export function ProfileModal({
  isOpen,
  onClose,
  userName,
  userAvatar,
  onLogout,
}: ProfileModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onClose}
      ></div>

      {/* Profile Card */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
        onClick={(e) => {
          // Close modal if clicking outside the card content (but inside this flex container)
          // Actually, the backdrop handles the outside click. 
          // This handler prevents clicks inside the card from closing it.
          e.stopPropagation();
        }}
      >
        <div className="bg-white rounded-[78px] w-full max-w-[328px] p-8 shadow-2xl">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-[101px] h-[103px] rounded-full border-2 border-[#E32712] overflow-hidden bg-gray-100">
              <img
                src={
                  userAvatar ||
                  "https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
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
                onClose();
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
                onClose();
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

            {/* Vender Repuesto (Agregar Producto) - REMOVED but route exists */}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#6D6E73] my-6"></div>

          {/* Cerrar Sesión */}
          <button
            onClick={onLogout}
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
  );
}

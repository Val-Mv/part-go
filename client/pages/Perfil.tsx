import { useState, useEffect, FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Camera } from "lucide-react";
import {
  saveUserProfile,
  getUserProfile,
  UserProfile,
} from "@/lib/user-profile";

export default function Perfil() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<UserProfile>({
    nombre: "",
    telefono: "",
    direccion: "",
    correo: "",
    avatar: "",
  });

  useEffect(() => {
    const savedProfile = getUserProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveUserProfile(profile);
    navigate("/menu");
  };

  const handleChange = (field: keyof UserProfile, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-partgo-hero flex flex-col items-center px-4 py-4 sm:py-8">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* White Card Container */}
        <div className="bg-white rounded-[78px] w-full max-w-[338px] p-8 pt-0 shadow-2xl relative">
          {/* Avatar - positioned to overlap top */}
          <div className="flex justify-center -mt-16 mb-2">
            <div 
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-[101px] h-[103px] rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                <img
                  src={
                    profile.avatar ||
                    "https://api.builder.io/api/v1/image/assets/TEMP/58fc892707594f2a836d14fef1bbfe3fda3c2feb?width=138"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Edit Overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white w-8 h-8" />
              </div>
              {/* Edit Badge */}
              <div className="absolute bottom-0 right-0 bg-[#FF3C00] p-1.5 rounded-full border-2 border-white shadow-sm">
                <Pencil className="w-3 h-3 text-white" />
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Header with Edit Icon */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <h2
                className="text-black text-center text-2xl font-black"
                style={{ fontFamily: "Montserrat" }}
              >
                {profile.nombre || "ALEX MANCIPE"}
              </h2>
              <button type="button" className="p-1">
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="17.5" cy="17.5" r="17.5" fill="#E5E5E5" />
                  <path
                    d="M23.5 10.5L24.5 11.5L14.5 21.5L10.5 22.5L11.5 18.5L21.5 8.5L23.5 10.5Z"
                    fill="#666"
                  />
                </svg>
              </button>
            </div>

            {/* Nombre Field */}
            <div>
              <label
                className="text-black text-center block text-lg font-semibold mb-2"
                style={{ fontFamily: "Montserrat" }}
              >
                NOMBRE
              </label>
              <input
                type="text"
                value={profile.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                className="w-full h-[29px] bg-[#F2F0F0] rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A33]"
                style={{ fontFamily: "Montserrat" }}
                placeholder="Ingresa tu nombre"
              />
            </div>

            {/* Telefono Field */}
            <div>
              <label
                className="text-black text-center block text-lg font-semibold mb-2"
                style={{ fontFamily: "Montserrat" }}
              >
                TELEFONO
              </label>
              <input
                type="tel"
                value={profile.telefono}
                onChange={(e) => handleChange("telefono", e.target.value)}
                className="w-full h-[29px] bg-[#F2F0F0] rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A33]"
                style={{ fontFamily: "Montserrat" }}
                placeholder="Ingresa tu teléfono"
              />
            </div>

            {/* Direccion Field */}
            <div>
              <label
                className="text-black text-center block text-lg font-semibold mb-2"
                style={{ fontFamily: "Montserrat" }}
              >
                DIRECCION
              </label>
              <input
                type="text"
                value={profile.direccion}
                onChange={(e) => handleChange("direccion", e.target.value)}
                className="w-full h-[29px] bg-[#F2F0F0] rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A33]"
                style={{ fontFamily: "Montserrat" }}
                placeholder="Ingresa tu dirección"
              />
            </div>

            {/* Correo Field */}
            <div>
              <label
                className="text-black text-center block text-lg font-semibold mb-2"
                style={{ fontFamily: "Montserrat" }}
              >
                CORREO
              </label>
              <input
                type="email"
                value={profile.correo}
                onChange={(e) => handleChange("correo", e.target.value)}
                className="w-full h-[29px] bg-[#F2F0F0] rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7A33]"
                style={{ fontFamily: "Montserrat" }}
                placeholder="Ingresa tu correo"
              />
            </div>

            {/* Guardar Button */}
            <div className="pt-4 flex justify-center">
              <button
                type="submit"
                className="w-[162px] h-[50px] bg-[#FF7A33] rounded-[21px] shadow-md hover:bg-[#FF8A43] transition-colors active:scale-95"
              >
                <span
                  className="text-white text-xl font-extrabold"
                  style={{ fontFamily: "Montserrat" }}
                >
                  GUARDAR
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate("/menu")}
          className="mt-6 text-white text-lg font-semibold hover:underline"
          style={{ fontFamily: "Montserrat" }}
        >
          ← Volver al Menú
        </button>
      </div>
    </div>
  );
}

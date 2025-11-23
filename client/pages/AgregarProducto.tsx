import { useState, useRef, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/db";

export default function AgregarProducto() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  
  const [product, setProduct] = useState({
    name: "",
    price: "",
    type: "GENERICO" as "ORIGINAL" | "GENERICO",
    image: "",
  });

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 500; // Reduced max width
          const MAX_HEIGHT = 500; // Reduced max height
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          // Compress to JPEG with 0.6 quality
          resolve(canvas.toDataURL("image/jpeg", 0.6));
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const resizedImage = await resizeImage(file);
        setProduct((prev) => ({
          ...prev,
          image: resizedImage,
        }));
      } catch (error) {
        console.error("Error resizing image:", error);
        toast({
          title: "Error",
          description: "No se pudo procesar la imagen.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Save to IndexedDB for persistence (client-side)
      const newProduct = {
        ...product,
        id: Date.now(), // Simple ID generation
        price: `$${product.price}`, // Format price if needed, or keep as raw number
        warranty: "30 Días de Garantía", // Generic warranty
      };
      
      await db.addProduct(newProduct);

      toast({
        title: "Producto creado",
        description: "El producto se ha agregado al catálogo exitosamente.",
      });

      navigate("/catalogo");
    } catch (error: any) {
      console.error("Error creating product:", error);
      toast({
        title: "Error",
        description: error.message || "No se pudo crear el producto.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-partgo-hero flex flex-col items-center px-4 py-4 sm:py-8 relative">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-4 sm:mb-8 gap-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-8 h-8" />
          </button>
          <h1
            className="text-white text-3xl sm:text-4xl font-semibold text-center flex-1"
            style={{
              fontFamily: "Montserrat",
              textShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
              WebkitTextStroke: "1px white",
            }}
          >
            VENDER
          </h1>
          <div className="w-8"></div> {/* Spacer for centering */}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-[40px] w-full p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Image Upload */}
            <div className="flex justify-center mb-6">
              <div 
                className="relative w-40 h-40 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden"
                onClick={() => fileInputRef.current?.click()}
              >
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Camera className="w-10 h-10 mb-2" />
                    <span className="text-sm font-medium">Subir Foto</span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required={!product.image}
                />
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-2">NOMBRE DEL REPUESTO</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className="w-full h-12 px-4 bg-[#F5F5F5] rounded-xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF3C00]"
                placeholder="Ej: Kit de Cilindro"
                required
              />
            </div>

            {/* Price Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-2">PRECIO</label>
              <input
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                className="w-full h-12 px-4 bg-[#F5F5F5] rounded-xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#FF3C00]"
                placeholder="Ej: 50000"
                required
              />
            </div>

            {/* Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-2">TIPO</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setProduct({ ...product, type: "ORIGINAL" })}
                  className={`h-12 rounded-xl font-bold transition-colors ${
                    product.type === "ORIGINAL"
                      ? "bg-[#2EF54F] text-white shadow-md"
                      : "bg-[#F5F5F5] text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  ORIGINAL
                </button>
                <button
                  type="button"
                  onClick={() => setProduct({ ...product, type: "GENERICO" })}
                  className={`h-12 rounded-xl font-bold transition-colors ${
                    product.type === "GENERICO"
                      ? "bg-[#F52E2E] text-white shadow-md"
                      : "bg-[#F5F5F5] text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  GENERICO
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#FF3C00] text-white rounded-full text-xl font-bold shadow-lg hover:bg-[#E32712] transition-colors disabled:opacity-50 mt-8"
              style={{ fontFamily: "Montserrat" }}
            >
              {loading ? "PUBLICANDO..." : "PUBLICAR"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

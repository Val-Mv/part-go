import "dotenv/config";
import express, { Express } from "express";
import bodyParser from "body-parser";
import { handleDemo } from "./routes/demo";

// 1. Lista de productos en memoria
const products = [
  {
    id: 1,
    name: "KIT DE CILINDRO",
    price: "$583.000",
    type: "ORIGINAL",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/cdf073f1082d4432a207b254e9dd7c7d6489a4f6?width=248",
  },
  {
    id: 2,
    name: "KIT DE CILINDRO",
    price: "$242.500",
    type: "GENERICO",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/d2dc656134920a8164b10184da5f8959a37c8cf9?width=236",
  },
  {
    id: 3,
    name: "PASTILLA DE FRENO",
    price: "$281.000",
    type: "ORIGINAL",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/ba45d26294a6df5720017ed2523045ff81a91013?width=290",
  },
  {
    id: 4,
    name: "PASTILLA DE FRENO",
    price: "$70.000",
    type: "GENERICO",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/d18aa3f62ccfe3b68f1195acadf2e8d5bd1c1899?width=286",
  },
];

export function createServer(): Express {
  const app = express();

  app.use(bodyParser.json());

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // 2. Endpoint para obtener todos los productos
  app.get("/api/products", (req, res) => {
    res.json(products);
  });

  // 3. Endpoint para agregar un nuevo producto
  app.post("/api/products", (req, res) => {
    const newProduct = req.body;
    // Simulamos un nuevo ID
    newProduct.id = products.length + 1;
    // Lo agregamos a nuestra lista en memoria
    products.push(newProduct);
    // Respondemos con el producto creado
    res.status(201).json(newProduct);
  });

  // 4. Endpoint para obtener un solo producto por ID
  app.get("/api/products/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const product = products.find((p) => p.id === id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });

  return app;
}

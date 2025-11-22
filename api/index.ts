import "dotenv/config";
import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { handleDemo } from "../server/routes/demo";

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

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// PWA specific headers
app.use((req, res, next) => {
  if (req.path === "/manifest.json") {
    res.setHeader("Content-Type", "application/manifest+json");
    res.setHeader("Cache-Control", "public, max-age=3600");
  } else if (req.path === "/service-worker.js") {
    res.setHeader("Content-Type", "application/javascript");
    res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
    res.setHeader("Service-Worker-Allowed", "/");
  }
  next();
});

// Endpoints de la API
app.get("/api/ping", (_req, res) => {
  const ping = process.env.PING_MESSAGE ?? "ping";
  res.json({ message: ping });
});

app.get("/api/demo", handleDemo);

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.get("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

// Exporta la app para Vercel
export default app;
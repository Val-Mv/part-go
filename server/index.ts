import { Express } from "express";
import api from "../api";

export function createServer(): Express {
  // En desarrollo, simplemente usamos la misma app que usará Vercel.
  // Esto asegura que el comportamiento sea consistente.
  return api;
}

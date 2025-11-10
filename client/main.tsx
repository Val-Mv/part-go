import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { registerServiceWorker } from "@/lib/service-worker";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for PWA (only once)
if (!window.__swRegistered) {
  registerServiceWorker();
  window.__swRegistered = true;
}

declare global {
  interface Window {
    __swRegistered?: boolean;
  }
}

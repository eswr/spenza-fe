import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/theme-provider";
// import { Providers } from './providers';
import { AuthProvider } from '@/context/AuthContext';
import { QueryProvider } from "./components/query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          {/* <Providers> */}
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              {/* <RouterProvider router={App} /> */}
              <App />
              
            </ThemeProvider>
          {/* </Providers> */}
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
);

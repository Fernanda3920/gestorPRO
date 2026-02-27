import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LocalesPage from "./pages/LocalesPage";
import "./App.css";

const Placeholder = ({ titulo }) => (
  <div>
    <h1 className="page-title">{titulo}</h1>
    <p className="page-subtitle">Sección en construcción...</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/"              element={<Placeholder titulo="Dashboard" />} />
          <Route path="/locales"       element={<LocalesPage />} />
          <Route path="/contratos"     element={<Placeholder titulo="Contratos" />} />
          <Route path="/expedientes"   element={<Placeholder titulo="Expedientes" />} />
          <Route path="/incrementos"   element={<Placeholder titulo="Incrementos" />} />
          <Route path="/financiero"    element={<Placeholder titulo="Financiero" />} />
          <Route path="/arrendatarios" element={<Placeholder titulo="Arrendatarios" />} />
          <Route path="/reportes"      element={<Placeholder titulo="Reportes" />} />
          <Route path="/configuracion" element={<Placeholder titulo="Configuración" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
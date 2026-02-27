import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import Icon from "../components/Icon";
import LocalDrawer from "../components/LocalDrawer";

const ESTATUS = {
  rentado:               { label: "Rentado",               color: "#22c55e" },
  desocupado:            { label: "Desocupado",            color: "#3b82f6" },
  propuesta_activa:      { label: "En propuesta activa",   color: "#f59e0b" },
  proximo_a_desocuparse: { label: "Próximo a desocuparse", color: "#f97316" },
};

const fmt = (n) =>
  n != null
    ? "$" + Number(n).toLocaleString("es-MX", { minimumFractionDigits: 2 })
    : "—";

export default function LocalesPage() {
  const [locales, setLocales]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [busqueda, setBusqueda]     = useState("");
  const [filtro, setFiltro]         = useState("todos");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [localSel, setLocalSel]     = useState(null); // null = crear, objeto = editar

  useEffect(() => { fetchLocales(); }, []);

  const fetchLocales = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("locales").select("*").order("numero");
    if (!error) setLocales(data);
    setLoading(false);
  };

  const abrirCrear = () => { setLocalSel(null); setDrawerOpen(true); };
  const abrirEditar = (local) => { setLocalSel(local); setDrawerOpen(true); };

  const conteos = Object.keys(ESTATUS).reduce((acc, key) => {
    acc[key] = locales.filter((l) => l.estatus === key).length;
    return acc;
  }, {});

  const filtrados = locales.filter((l) => {
    const coincideBusqueda = String(l.numero).includes(busqueda.trim());
    const coincideEstatus  = filtro === "todos" || l.estatus === filtro;
    return coincideBusqueda && coincideEstatus;
  });

  return (
    <div>
      {/* Encabezado */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Locales</h1>
          <p className="page-subtitle">Gestión de locales comerciales</p>
        </div>
        <button className="btn-primary" onClick={abrirCrear}>
          <Icon name="plus" /> Nuevo Local
        </button>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-wrap">
          <Icon name="search" />
          <input
            className="search-input"
            placeholder="Buscar por número..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <select
          className="filter-select"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="todos">Todos los estatus</option>
          {Object.entries(ESTATUS).map(([key, cfg]) => (
            <option key={key} value={key}>{cfg.label}</option>
          ))}
        </select>
      </div>

      {/* Cards resumen */}
      <div className="status-cards">
        {Object.entries(ESTATUS).map(([key, cfg]) => (
          <div
            key={key}
            className={`status-card ${filtro === key ? "status-card--active" : ""}`}
            onClick={() => setFiltro(filtro === key ? "todos" : key)}
          >
            <span className="status-dot" style={{ background: cfg.color }} />
            <div>
              <p className="status-count">{conteos[key]}</p>
              <p className="status-label">{cfg.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabla */}
      {loading ? (
        <p className="empty-msg">Cargando locales...</p>
      ) : filtrados.length === 0 ? (
        <p className="empty-msg">No se encontraron locales.</p>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                {["Local","m²","Estatus","Renta","Mant.","Total","$/m² Renta","$/m² Mant.","Prom/m²"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((l) => {
                const est = ESTATUS[l.estatus] ?? { label: l.estatus, color: "#94a3b8" };
                return (
                  <tr
                    key={l.id}
                    className="table-row--clickable"
                    onClick={() => abrirEditar(l)}
                    title="Clic para editar"
                  >
                    <td><strong>{l.numero}</strong></td>
                    <td>{l.metros_cuadrados}</td>
                    <td>
                      <span className="badge" style={{ "--badge-color": est.color }}>
                        <span className="badge-dot" style={{ background: est.color }} />
                        {est.label}
                      </span>
                    </td>
                    <td>{fmt(l.renta)}</td>
                    <td>{fmt(l.mantenimiento_mensual)}</td>
                    <td><strong>{fmt(l.total)}</strong></td>
                    <td>{fmt(l.renta_por_m2)}</td>
                    <td>{fmt(l.mantenimiento_por_m2)}</td>
                    <td>{fmt(l.promedio_por_m2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <LocalDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSaved={fetchLocales}
        local={localSel}
      />
    </div>
  );
}
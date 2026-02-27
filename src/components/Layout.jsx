import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Icon from "./Icon";

const navItems = [
  { to: "/",              label: "Dashboard",    icon: "dashboard"     },
  { to: "/locales",       label: "Locales",       icon: "locales"       },
  { to: "/contratos",     label: "Contratos",     icon: "contratos"     },
  { to: "/expedientes",   label: "Expedientes",   icon: "expedientes"   },
  { to: "/incrementos",   label: "Incrementos",   icon: "incrementos"   },
  { to: "/financiero",    label: "Financiero",    icon: "financiero"    },
  { to: "/arrendatarios", label: "Arrendatarios", icon: "arrendatarios" },
  { to: "/reportes",      label: "Reportes",      icon: "reportes"      },
  { to: "/configuracion", label: "Configuración", icon: "config"        },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "sidebar--open" : "sidebar--closed"}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">
            <Icon name="locales" />
          </div>
          <span className="logo-text">GestorPro</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`nav-item ${isActive ? "nav-item--active" : ""}`}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* Contenido */}
      <div className="main-wrap">
        <header className="topbar">
          <button className="topbar-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Icon name="menu" />
          </button>
        </header>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
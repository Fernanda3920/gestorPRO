import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  FileText,
  FolderOpen,
  TrendingUp,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

const navItems = [
  { to: "/",              label: "Dashboard",     icon: LayoutDashboard },
  { to: "/locales",       label: "Locales",        icon: Store },
  { to: "/contratos",     label: "Contratos",      icon: FileText },
  { to: "/expedientes",   label: "Expedientes",    icon: FolderOpen },
  { to: "/incrementos",   label: "Incrementos",    icon: TrendingUp },
  { to: "/financiero",    label: "Financiero",     icon: DollarSign },
  { to: "/arrendatarios", label: "Arrendatarios",  icon: Users },
  { to: "/reportes",      label: "Reportes",       icon: BarChart3 },
  { to: "/configuracion", label: "Configuración",  icon: Settings },
];
const AppSidebar = ({ open, onClose }) => {
  const location = useLocation();

return (
    <>
      {/* Overlay oscuro en móvil */}
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={onClose}
      />

      <aside className={`app-sidebar ${open ? "open" : ""}`}>
        {/* Logo */}
        <div className="sidebar-header flex items-center">
          <div className="logo-box">
            <Store className="logo-icon" />
          </div>
          <span className="logo-text">GestorPro</span>
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="ml-auto md:hidden p-2 rounded hover:bg-gray-100"
          >
            <X />
          </button>
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
                onClick={onClose}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                <item.icon className="nav-icon" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AppSidebar;
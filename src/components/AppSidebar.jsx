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

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-60 min-h-screen bg-white border-r border-gray-200 flex flex-col py-6">
      {/* Logo */}
      <div className="px-6 mb-8 flex items-center gap-2">
        {/* Ícono cuadrado con fondo violeta, igual al de la imagen */}
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center flex-shrink-0">
          <Store className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-bold text-gray-900 tracking-tight">
          GestorPro
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-600 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AppSidebar;
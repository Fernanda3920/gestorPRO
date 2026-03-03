import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out flex-shrink-0 ${
          sidebarOpen
            ? "fixed inset-0 z-40 w-full md:static md:w-60"
            : "w-0 md:static md:w-0"
        } overflow-hidden`}
      >
        <AppSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top header — solo tiene el botón hamburguesa */}
        <header className="h-12 flex items-center px-4 border-b border-gray-200 bg-white flex-shrink-0">
         <button onClick={() => setSidebarOpen(true)}>
  <Menu />
</button>
        </header>

        {/* Página activa */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
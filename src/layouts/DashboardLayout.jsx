import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Zone principale avec scroll */}
        <main className="flex-1 overflow-y-auto p-8 sm:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

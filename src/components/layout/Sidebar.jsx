import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const mainNav = [{ path: "/dashboard", label: "Tableau de bord" }];

  const productivityItems = [
    { path: "/dashboard/tasks", label: "Tâches" },
    { path: "/dashboard/objectifs", label: "Objectifs" },
    { path: "/dashboard/projets", label: "Projets" },
  ];

  const devPersonnel = [{ path: "/dashboard/sppa", label: "SPPA" }];

  const NavItem = ({ path, label }) => (
    <NavLink
      to={path}
      end={path === "/dashboard"}
      className={({ isActive }) =>
        `relative block px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md
         ${
           isActive
             ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600 shadow-sm"
             : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
         }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <aside className="w-60 bg-white border-r border-gray-200 min-h-screen p-6 flex flex-col">
      {/* Logo */}
      <div className="mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-linear-to-br from-blue-600 to-blue-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
            EQ
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            EQ360
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-8">
        {/* Main */}
        <div className="space-y-1">
          {mainNav.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </div>

        {/* Productivity */}
        <div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="text-[11px] uppercase text-gray-400 font-semibold mb-2 px-4 tracking-wider">
            Hub de productivité
          </div>
          <div className="space-y-1">
            {productivityItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>
        </div>

        {/* Personal Dev */}
        <div>
          <div className="border-t border-gray-300 my-4"></div>
          <div className="text-[11px] uppercase text-gray-400 font-semibold mb-2 px-4 tracking-wider">
            Développement personnel
          </div>
          <div className="space-y-1">
            {devPersonnel.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;

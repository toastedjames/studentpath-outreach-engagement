import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Send,
  CheckSquare,
  Users,
  BarChart3,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Outreach",
    path: "/outreach",
    icon: Send,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Family Engagement",
    path: "/family-engagement",
    icon: Users,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: BarChart3,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          S
        </div>

        <div>
          <h1>StudentPath</h1>

          <span>
            Outreach & Engagement
          </span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `nav-item ${
                  isActive ? "active" : ""
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p>Student Success Programs</p>

        <span>2026–2027</span>
      </div>
    </aside>
  );
}

export default Sidebar;
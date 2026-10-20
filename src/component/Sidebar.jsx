import { NavLink } from "react-router";
import {
  House,
  ShoppingCart,
  Package,
  Boxes,
  History,
  ChartNoAxesColumn,
  Users,
  Settings,
} from "lucide-react";



const menuItems = [
  { name: "Home", path: "/", icon: House },
  { name: "New Sale", path: "/sales/new", icon: ShoppingCart },
  { name: "Products", path: "/products", icon: Package },
  { name: "Inventory", path: "/inventory", icon: Boxes },
  { name: "Sales History", path: "/sales/history", icon: History },
  { name: "Reports", path: "/reports", icon: ChartNoAxesColumn },
  { name: "Staff Management", path: "/staff", icon: Users },
  { name: "Settings", path: "/settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-black p-5 text-white">
      <h2 className="mb-8 text-xl font-bold">Loseyi Mart</h2>

      <nav className="space-y-2">
        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                isActive
                  ? "bg-white text-black"
                  : "text-white hover:bg-gray-800"
              }`
            }
          >
            <Icon size={20} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}


export default  Sidebar
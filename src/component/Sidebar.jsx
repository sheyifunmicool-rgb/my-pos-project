
import { NavLink } from "react-router-dom";
import { useCashier } from "../context/CashierContext";

import {
  House,
  ShoppingCart,
  Package,
  Boxes,
  History,
} from "lucide-react";

export default function Sidebar() {
  const { logout } = useCashier();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", Icon: House },
    
    { name: "New Sale", path: "/pos", Icon: ShoppingCart },
    { name: "Products", path: "/products", Icon: Package },
    { name: "Inventory", path: "/inventory", Icon: Boxes },
    {
      name: "Sales History",
      path: "/sales-history",
      Icon: History,
    },
  ];

  return (
    <aside className="sticky top-20 min-h-screen w-40 shrink-0 bg-black p-5 text-white">
      <nav className="space-y-2">
        {menuItems.map(({ name, path, Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-3 rounded-lg px-3 py-3 transition ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-800"
              }`
            }
          >
            <Icon size={20} />
            <span className="text-center text-sm">{name}</span>
          </NavLink>
        ))}

        <div className="mt-4 flex flex-col items-center">
          <button
            onClick={logout}
            className="rounded-lg bg-red-600 p-3 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
}

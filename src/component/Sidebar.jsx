

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

function Sidebar() {
  return (
    <aside className="min-h-screen w-40 bg-black p-5 text-white">
      <nav className="space-y-2">
        <div className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800">
          <House size={20} /><br/>
          <span>Da</span>
        </div>

        <div className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800">
          <ShoppingCart size={20} />
          <span>New Sale</span>
        </div>

        <div className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800">
          <Package size={20} />
          <span>Products</span>
        </div>

        <div className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800">
          <Boxes size={20} />
          <span>Inventory</span>
        </div>

        <div className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800">
          <History size={20} />
          <span>Sales History</span>
        </div>

        <div className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800">
          <ChartNoAxesColumn size={20} />
          <span>Reports</span>
        </div>

        <div className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800">
          <Users size={20} />
          <span>Staff Management</span>
        </div>

        <div className="flex items-center gap-3 rounded-lg px-4 py-3 transition hover:bg-gray-800">
          <Settings size={20} />
          <span>Settings</span>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;

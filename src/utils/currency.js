
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  ChartNoAxesColumn,
  Bell,
  Search,
  CreditCard,
  Banknote,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Receipt,
  Plus,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Loseyi Mart
          </h2>
          <p className="text-sm text-gray-500">POS System</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-lg border px-3 py-2 md:flex">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-52 outline-none"
            />
          </div>

          <button className="relative rounded-full p-2 hover:bg-gray-100">
            <Bell size={22} />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div>
            <p className="font-semibold">Funmi</p>
            <p className="text-xs text-gray-500">Cashier</p>
          </div>
        </div>
      </header>

      <div className="flex">

        {/* Sidebar */}
        <aside className="hidden min-h-screen w-60 bg-white p-5 shadow-sm md:block">
          <p className="mb-4 text-xs font-semibold uppercase text-gray-400">
            Main Menu
          </p>

          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 rounded-lg bg-blue-600 px-4 py-3 text-white">
              <LayoutDashboard size={20} />
              Dashboard
            </a>

            <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100">
              <ShoppingCart size={20} />
              Sales / POS
            </a>

            <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100">
              <Package size={20} />
              Products
            </a>

            <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100">
              <Users size={20} />
              Customers
            </a>

            <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100">
              <Receipt size={20} />
              Transactions
            </a>

            <a href="#" className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-600 hover:bg-gray-100">
              <ChartNoAxesColumn size={20} />
              Reports
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 md:p-8">

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Welcome back, Funmi! Here's your store overview.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">
              <Plus size={18} />
              New Sale
            </button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Today's Sales</p>
                <ShoppingCart className="text-blue-600" size={22} />
              </div>
              <h2 className="mt-4 text-2xl font-bold">₦245,800</h2>
              <p className="mt-2 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp size={16} /> +12.5% from yesterday
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Total Products</p>
                <Package className="text-purple-600" size={22} />
              </div>
              <h2 className="mt-4 text-2xl font-bold">1,250</h2>
              <p className="mt-2 text-sm text-gray-500">
                Products in inventory
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Customers</p>
                <Users className="text-orange-500" size={22} />
              </div>
              <h2 className="mt-4 text-2xl font-bold">856</h2>
              <p className="mt-2 text-sm text-gray-500">
                Registered customers
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">Payments</p>
                <Banknote className="text-green-600" size={22} />
              </div>
              <h2 className="mt-4 text-2xl font-bold">₦198,500</h2>
              <p className="mt-2 text-sm text-gray-500">
                Total received today
              </p>
            </div>

          </div>

          {/* Sales and Transactions */}
          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

            <section className="rounded-xl bg-white p-6 shadow-sm xl:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900">Recent Sales</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Latest transactions from your store
                  </p>
                </div>
                <button className="text-sm font-medium text-blue-600">
                  View all
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b text-gray-500">
                      <th className="pb-3 pr-4">Receipt</th>
                      <th className="pb-3 pr-4">Cashier</th>
                      <th className="pb-3 pr-4">Amount</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["#LS001", "Funmi", "₦25,000", "Paid"],
                      ["#LS002", "Funmi", "₦12,500", "Paid"],
                      ["#LS003", "Tunde", "₦8,000", "Pending"],
                      ["#LS004", "Funmi", "₦34,500", "Paid"],
                    ].map((sale) => (
                      <tr key={sale[0]} className="border-b last:border-0">
                        <td className="py-4 pr-4 font-medium">{sale[0]}</td>
                        <td className="py-4 pr-4">{sale[1]}</td>
                        <td className="py-4 pr-4 font-semibold">{sale[2]}</td>
                        <td className="py-4">
                          <span className={`rounded-full px-3 py-1 text-xs ${
                            sale[3] === "Paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {sale[3]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Quick Actions */}
            <section className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="font-bold text-gray-900">Quick Actions</h2>
              <p className="mt-1 text-sm text-gray-500">
                Common store operations
              </p>

              <div className="mt-5 space-y-3">
                <button className="flex w-full items-center justify-between rounded-lg border p-4 hover:bg-gray-50">
                  <span className="flex items-center gap-3">
                    <ShoppingCart size={20} className="text-blue-600" />
                    New Sale
                  </span>
                  <ArrowUpRight size={18} />
                </button>

                <button className="flex w-full items-center justify-between rounded-lg border p-4 hover:bg-gray-50">
                  <span className="flex items-center gap-3">
                    <Package size={20} className="text-purple-600" />
                    Add Product
                  </span>
                  <ArrowUpRight size={18} />
                </button>

                <button className="flex w-full items-center justify-between rounded-lg border p-4 hover:bg-gray-50">
                  <span className="flex items-center gap-3">
                    <CreditCard size={20} className="text-green-600" />
                    Payments
                  </span>
                  <ArrowUpRight size={18} />
                </button>
              </div>

              <div className="mt-6 rounded-lg bg-blue-50 p-4">
                <div className="flex items-center gap-2 text-blue-700">
                  <Clock size={18} />
                  <p className="font-semibold">Store Summary</p>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Your sales overview for today is ready to review.
                </p>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;



import { NavLink } from "react-router";

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

export default function Sidebar() {
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


import { useCashier } from "../context/CashierContext";
import SalesHistory from "./SaleHistory";

function Dashboard() {
  const { cashier, sales, logout } = useCashier();
  const logCashier = cashier.name
  const mySales = sales.filter(
    (sale)=>sale.cashier?.toLowerCase() === logCashier?.toLowerCase()
  );
  
  console.log(logCashier)
  console.log(sales)
  console.log(mySales)
  const totalRevenue = mySales.reduce(
    (sum, sale) => sum + sale.total,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome, {cashier.name}
          </p>
        </div>

        <button
          onClick={logout}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Sales</p>
          <h2 className="mt-2 text-2xl font-bold">
            ₦{totalRevenue.toLocaleString("en-NG")}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Transactions</p>
          <h2 className="mt-2 text-2xl font-bold">
            {mySales.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Logged-in Cashier</p>
          <h2 className="mt-2 text-xl font-bold">
            {cashier.name}
          </h2>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">
          Recent Sales
        </h2>

        {mySales.length === 0 ? (
          <p className="text-gray-500">
            No sales recorded yet.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="p-3">Date</th>
                <th className="p-3">Cashier</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>

            <tbody>
              {mySales.map((sale) => (
                <tr key={sale.id} className="border-b">
                  <td className="p-3">
                    {new Date(sale.date).toLocaleString()}
                  </td>

                  <td className="p-3">{sale.cashier}</td>

                  <td className="p-3">
                    {sale.items.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </td>

                  <td className="p-3 font-semibold">
                    ₦{sale.total.toLocaleString("en-NG")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

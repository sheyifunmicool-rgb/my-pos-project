import { useState } from "react";
import { useCashier } from "../context/CashierContext";
 

import {
  getDateKey,
  getWeekStart,
  formatMoney,
} from "../utils/salesUtils"

function SalesReport() {

  const { sales } = useCashier();

  const [period, setPeriod] = useState("daily");

  const today = getDateKey(new Date());

  // Filter sales based on selected period
  const filteredSales = sales.filter((sale) => {

    const saleDate = new Date(sale.date);

    if (period === "daily") {
      return getDateKey(saleDate) === today;
    }

    if (period === "weekly") {
      return getWeekStart(saleDate) === getWeekStart(new Date());
    }

    if (period === "monthly") {
      const now = new Date();

      return (
        saleDate.getMonth() === now.getMonth() &&
        saleDate.getFullYear() === now.getFullYear()
      );
    }

    return false;
  });

  const totalSales = filteredSales.reduce(
    (total, sale) => total + Number(sale.total || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      <h1 className="text-2xl font-bold mb-6">
        Sales Reports
      </h1>

      {/* Report selection */}

      <div className="flex flex-wrap gap-3 mb-8">

        {["daily", "weekly", "monthly"].map((item) => (

          <button
            key={item}
            onClick={() => setPeriod(item)}
            className={`px-6 py-3 rounded-lg capitalize ${
              period === item
                ? "bg-amber-500 text-black"
                : "bg-slate-800"
            }`}
          >
            {item} Report
          </button>

        ))}

      </div>

      {/* Total sales */}

      <div className="bg-slate-900 p-6 rounded-xl mb-8">

        <p className="text-gray-400">
          Total {period} Sales
        </p>

        <h2 className="text-3xl font-bold text-amber-400 mt-2">
          {formatMoney(totalSales)}
        </h2>

        <p className="text-gray-400 mt-3">
          {filteredSales.length} Transactions
        </p>

      </div>

      {/* Transactions */}

      <div className="bg-slate-900 rounded-xl p-5">

        <h2 className="text-xl font-semibold mb-5">
          Transaction History
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="text-gray-400 border-b border-gray-700">

              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">Cashier</th>
                <th className="p-3">Amount</th>
              </tr>

            </thead>

            <tbody>

              {filteredSales.map((sale) => (

                <tr
                  key={sale.id}
                  className="border-b border-gray-800"
                >

                  <td className="p-3">
                    {new Date(sale.date).toLocaleString()}
                  </td>

                  <td className="p-3">
                    {sale.cashier}
                  </td>

                  <td className="p-3 text-amber-400">
                    {formatMoney(sale.total)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredSales.length === 0 && (
            <p className="text-center text-gray-400 py-8">
              No sales recorded for this period.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}

export default SalesReport;

import { useMemo, useState } from "react";
import { History, Search, Receipt, Banknote } from "lucide-react";
import { useCashier } from "../context/CashierContext";

function SalesHistory() {
  const { sales } = useCashier();
  const [search, setSearch] = useState("");

  const [selectedSale, setSelectedSale] = useState(null);

  const filteredSales = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sales.filter((sale) => {
      const cashier = sale.cashier || "";
      const saleId = sale.id || "";

      return (
        cashier.toLowerCase().includes(query) ||
        saleId.toLowerCase().includes(query) ||
        (sale.items || []).some((item) =>
          item.name.toLowerCase().includes(query)
        )
      );
    });
  }, [sales, search]);

  const totalRevenue = sales.reduce(
    (total, sale) => total + Number(sale.total || 0),
    0
  );

  const totalItemsSold = sales.reduce(
    (total, sale) =>
      total +
      (sale.items || []).reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      ),
    0
  );

  function formatDate(date) {
    return new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <History size={26} />
          Sales History
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View completed sales and transaction details.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Total Revenue
            </p>
            <Banknote className="text-green-600" size={22} />
          </div>

          <h2 className="mt-3 text-2xl font-bold">
            ₦{totalRevenue.toLocaleString("en-NG")}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Transactions
            </p>
            <Receipt className="text-blue-600" size={22} />
          </div>

          <h2 className="mt-3 text-2xl font-bold">
            {sales.length}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Units Sold
            </p>
            <History className="text-purple-600" size={22} />
          </div>

          <h2 className="mt-3 text-2xl font-bold">
            {totalItemsSold}
          </h2>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cashier, product, or sale ID..."
            className="w-full rounded-lg border bg-white py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Sales table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4">Sale ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Cashier</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Details</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">
                    {sale.id.slice(0, 8)}
                  </td>

                  <td className="whitespace-nowrap p-4">
                    {formatDate(sale.date)}
                  </td>

                  <td className="p-4">
                    {sale.cashier || "Unknown"}
                  </td>

                  <td className="p-4">
                    {(sale.items || []).reduce(
                      (sum, item) =>
                        sum + Number(item.quantity || 0),
                      0
                    )}
                  </td>

                  <td className="whitespace-nowrap p-4 font-semibold">
                    ₦{Number(sale.total).toLocaleString("en-NG")}
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => setSelectedSale(sale)}
                      className="rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-700 hover:bg-blue-100"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSales.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            {sales.length === 0
              ? "No completed sales yet."
              : "No sales match your search."}
          </p>
        )}
      </div>

      {/* Sale details modal */}
      {selectedSale && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Sale Details
              </h2>

              <button
                onClick={() => setSelectedSale(null)}
                className="rounded-lg px-3 py-1 text-xl hover:bg-gray-100"
                aria-label="Close sale details"
              >
                ×
              </button>
            </div>

            <div className="mb-5 space-y-2 text-sm">
              <p>
                <span className="text-gray-500">Sale ID:</span>{" "}
                {selectedSale.id}
              </p>

              <p>
                <span className="text-gray-500">Cashier:</span>{" "}
                {selectedSale.cashier || "Unknown"}
              </p>

              <p>
                <span className="text-gray-500">Date:</span>{" "}
                {formatDate(selectedSale.date)}
              </p>
            </div>

            <h3 className="mb-3 font-semibold">Products sold</h3>

            <div className="divide-y">
              {(selectedSale.items || []).map((item, index) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="flex justify-between gap-4 py-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × ₦
                      {Number(item.price).toLocaleString("en-NG")}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₦
                    {Number(
                      item.subtotal ??
                      item.price * item.quantity
                    ).toLocaleString("en-NG")}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-between border-t pt-4">
              <span className="font-bold">Total</span>
              <span className="text-xl font-bold">
                ₦
                {Number(selectedSale.total).toLocaleString("en-NG")}
              </span>
            </div>

            <button
              onClick={() => setSelectedSale(null)}
              className="mt-5 w-full rounded-lg bg-gray-900 p-3 font-semibold text-white hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SalesHistory;


import { useProducts } from "../context/productProvider";
import { useMemo, useState } from "react";
import { Search, Package, AlertTriangle, CheckCircle } from "lucide-react";

export default function Inventory() {
  const { products = [] } = useProducts();
  const [search, setSearch] = useState("");

  // Get products that are low in stock
  const lowStockProducts = useMemo(() => {
    return products.filter((product) => {
      const threshold = product.lowStockThreshold ?? 5;

      return (
        Number(product.stock) <= Number(threshold) &&
        Number(product.stock) >= 0
      );
    });
  }, [products]);

  // Search low-stock products
  const filteredProducts = lowStockProducts.filter((product) =>
    `${product.name} ${product.barcode ?? ""} ${product.category ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Inventory Management
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Monitor your products and identify items that need restocking.
        </p>
      </div>

      {/* Summary card */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Products
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {products.length}
              </h2>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600">
              <Package size={25} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Low Stock Products
              </p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">
                {lowStockProducts.length}
              </h2>
            </div>

            <div className="rounded-lg bg-red-100 p-3 text-red-600">
              <AlertTriangle size={25} />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search low-stock products..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Low stock section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Low Stock Products
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Products at or below their minimum stock threshold.
          </p>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-4 rounded-full bg-green-100 p-4 text-green-600">
              <CheckCircle size={36} />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              {lowStockProducts.length === 0
                ? "All stock levels are healthy!"
                : "No products found"}
            </h3>

            <p className="mt-2 max-w-sm text-sm text-gray-500">
              {lowStockProducts.length === 0
                ? "There are currently no low-stock products. Products needing restocking will appear here automatically."
                : "Try searching with a different product name or barcode."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-sm text-gray-500">
                  <tr>
                    <th className="px-5 py-4 font-medium">Product</th>
                    <th className="px-5 py-4 font-medium">Category</th>
                    <th className="px-5 py-4 font-medium">Barcode</th>
                    <th className="px-5 py-4 font-medium">In Stock</th>
                    <th className="px-5 py-4 font-medium">Minimum</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-11 w-11 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100">
                              <Package size={20} />
                            </div>
                          )}

                          <span className="font-medium text-gray-800">
                            {product.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {product.category || "Uncategorized"}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {product.barcode || "—"}
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-red-600">
                          {product.stock}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-gray-600">
                        {product.lowStockThreshold ?? 5}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Low Stock
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-4 p-4 md:hidden">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex items-center gap-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100">
                        <Package size={22} />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {product.category || "Uncategorized"}
                      </p>
                    </div>

                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                      Low
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-gray-500">Current stock</p>
                      <p className="mt-1 font-bold text-red-600">
                        {product.stock}
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-gray-500">Minimum stock</p>
                      <p className="mt-1 font-bold text-gray-800">
                        {product.lowStockThreshold ?? 5}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 break-all text-xs text-gray-500">
                    Barcode: {product.barcode || "—"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

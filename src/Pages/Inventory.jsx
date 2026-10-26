
import { useMemo, useState } from "react";
import { Search, Package, AlertTriangle, Boxes } from "lucide-react";
import { useProducts } from "../context/productProvider";
import { products } from "../data/product";

function Inventory() {
  const { products, updateProduct } = useProducts();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        String(product.barcode ?? "")
          .toLowerCase()
          .includes(query);

      const threshold = product.lowStockThreshold ?? 5;

      const matchesFilter =
        filter === "All" ||
        (filter === "Low Stock" &&
          product.stock > 0 &&
          product.stock <= threshold) ||
        (filter === "Out of Stock" && product.stock <= 0) ||
        (filter === "In Stock" && product.stock > threshold);

      return matchesSearch && matchesFilter;
    });
  }, [products, search, filter]);

  const totalProducts = products.length;

  const lowStockCount = products.filter(
    (p) =>
      p.stock > 0 &&
      p.stock <= (p.lowStockThreshold ?? 5)
  ).length;

  const outOfStockCount = products.filter(
    (p) => p.stock <= 0
  ).length;

  function changeStock(product, amount) {
    const nextStock = Math.max(0, product.stock + amount);

    updateProduct(product.id, {
      stock: nextStock,
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Inventory Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor products and manage stock levels.
        </p>
      </div>

      {/* Inventory summary */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Total Products
            </p>
            <Package className="text-blue-600" size={22} />
          </div>
          <p className="mt-3 text-2xl font-bold">
            {totalProducts}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Low Stock
            </p>
            <AlertTriangle className="text-amber-500" size={22} />
          </div>
          <p className="mt-3 text-2xl font-bold text-amber-600">
            {lowStockCount}
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Out of Stock
            </p>
            <Boxes className="text-red-600" size={22} />
          </div>
          <p className="mt-3 text-2xl font-bold text-red-600">
            {outOfStockCount}
          </p>
        </div>
      </div>

      {/* Search and filter */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name or barcode..."
            className="w-full rounded-lg border bg-white py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Stock</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      {/* Inventory table */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Barcode</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Adjust Stock</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredProducts.map((product) => {
                const threshold =
                  product.lowStockThreshold ?? 5;

                const outOfStock = product.stock <= 0;
                const lowStock =
                  !outOfStock && product.stock <= threshold;
                 console.log(products)
                return (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded-md object-contain"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                            <Package size={20} />
                          </div>
                        )}

                        <span className="font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    <td className="p-4 text-gray-500">
                      {product.barcode || product.sku}
                    </td>
                      
                    <td className="p-4">
                      {product.category}
                    </td>

                    <td className="whitespace-nowrap p-4">
                      ₦{Number(product.price).toLocaleString("en-NG")}
                    </td>

                    <td className="p-4 font-semibold">
                      {product.stock}
                    </td>

                    <td className="p-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
                          outOfStock
                            ? "bg-red-100 text-red-700"
                            : lowStock
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {outOfStock
                          ? "Out of Stock"
                          : lowStock
                          ? "Low Stock"
                          : "In Stock"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => changeStock(product, -1)}
                          disabled={outOfStock}
                          aria-label={`Decrease ${product.name} stock`}
                          className="rounded-md bg-gray-100 px-3 py-1.5 font-bold hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        <button
                          type="button"
                          onClick={() => changeStock(product, 1)}
                          aria-label={`Increase ${product.name} stock`}
                          className="rounded-md bg-blue-600 px-3 py-1.5 font-bold text-white hover:bg-blue-700"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <p className="p-8 text-center text-gray-500">
            No products match your search or filter.
          </p>
        )}
      </div>
    </div>
  );
}

export default Inventory;

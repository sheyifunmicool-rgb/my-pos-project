
import React, { useMemo, useState } from "react";
import { useProducts} from "../context/productProvider";
import { useCashier } from "../context/CashierContext";
export default function Products() {
  const { products = [], addProduct, updateProduct, deleteProduct } =
    useProducts();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
   const { cashier, sales, logout } = useCashier();
   const {name} = cashier
  const emptyForm = {
    name: "",
    barcode: "",
    category: "",
    price: "",
    stock: "",
  };
 console.log(cashier)
  const [form, setForm] = useState(emptyForm);

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase().trim();

    return products.filter((product) =>
      [product.name, product.sku, product.category]
        .some((value) =>
          String(value ?? "").toLowerCase().includes(term)
        )
    );
  }, [products, search]);

  const totalProducts = products.length;

  const totalStock = products.reduce(
    (total, product) => total + Number(product.stock || 0),
    0
  );

  const lowStock = products.filter(
    (product) => Number(product.stock || 0) > 0 &&
      Number(product.stock || 0) <= 5
  ).length;

  const outOfStock = products.filter(
    (product) => Number(product.stock || 0) <= 0
  ).length;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function openAddForm() {
     if (name?.toLowerCase() !== "seyi") {
    alert("You are not allowed to add products!");
    return;
  }
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function handleEdit(product) {
    if (name?.toLowerCase() !== "seyi") {
    alert("You are not allowed to edit products!");
    return;
  }

    setEditingId(product.id);
    setForm({
      name: product.name ?? "",
       barcode: product.barcode ?? "",
      category: product.category ?? "",
      price: String(product.price ?? ""),
      stock: String(product.stock ?? ""),
    });
    setShowForm(true);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const name = form.name.trim();
    const barcode = form.barcode.trim();
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !name ||
      !barcode ||
      !form.category ||
      form.price === "" ||
      form.stock === "" ||
      !Number.isFinite(price) ||
      !Number.isInteger(stock) ||
      price < 0 ||
      stock < 0
    ) {
      alert("Enter valid product details. Stock must be a whole number.");
      return;
    }

    const duplicateBarcode = products.some(
      (product) =>
        String(product.barcode).toLowerCase() === barcode.toLowerCase() &&
        product.id !== editingId
    );

    if (duplicateBarcode) {
      alert("This barcode already exists. Please use a unique SKU.");
      return;
    }

    const productData = {
      name,
      barcode,
      category: form.category,
      price,
      stock,
    };

    if (editingId !== null) {
      updateProduct(editingId, productData);
    } else {
      addProduct({
        ...productData,
        id: crypto.randomUUID(),
      });
    }

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function handleDelete(id) {
     if (name?.toLowerCase() !== "seyi") {
    alert("You are not allowed to delete products!");
    return;
  }
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  }

  const money = (value) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(Number(value) || 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Products
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your products, prices and stock levels.
            </p>
          </div>

          <button
            onClick={openAddForm}
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            + Add Product
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Products" value={totalProducts} />
          <StatCard title="Total Stock Units" value={totalStock} />
          <StatCard title="Low Stock" value={lowStock} />
          <StatCard title="Out of Stock" value={outOfStock} />
        </div>

        {/* Product Form */}
        {showForm && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                {editingId !== null ? "Edit Product" : "Add New Product"}
              </h2>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close product form"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FormField
                  label="Product Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Coca-Cola"
                />

                <FormField
                  label="SKU / Barcode"
                  name="barcode"
                  value={form.barcode}
                  onChange={handleChange}
                  placeholder="e.g. COKE001"
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="">Select category</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Food">Food</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Household">Household</option>
                    <option value="Personal Care">Personal Care</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <FormField
                  label="Selling Price (₦)"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />

                <FormField
                  label="Quantity in Stock"
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  step="1"
                />
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                  {editingId !== null ? "Save Changes" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Product Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Product Inventory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {filteredProducts.length} product(s) found
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, SKU or category..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 sm:max-w-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th className="px-5 py-4">Barcode</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Price</th>
                  <th className="px-5 py-4">Stock</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => {
                  const stock = Number(product.stock || 0);
                  const status =
                    stock <= 0
                      ? "Out of stock"
                      : stock <= 5
                      ? "Low stock"
                      : "In stock";

                  return (
                    <tr key={product.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {product.name}
                      </td>
                      <td className="px-5 py-4 text-slate-500">
                        {product.barcode}
                      </td>
                      <td className="px-5 py-4 text-slate-600">
                        {product.category}
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-900">
                        {money(product.price)}
                      </td>
                      <td className="px-5 py-4 text-slate-700">
                        {stock}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            stock <= 0
                              ? "bg-red-100 text-red-700"
                              : stock <= 5
                              ? "bg-amber-100 text-amber-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(product)}
                            className="font-semibold text-indigo-600 hover:text-indigo-800"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="font-semibold text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-12 text-center text-slate-500"
                    >
                      {products.length === 0
                        ? "No products yet. Click Add Product to get started."
                        : "No products match your search."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

function FormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  step,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        required
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}

ghhh

import { useMemo, useState } from "react";
import { initialProducts } from "../data/products";
function POS() {
  const [products] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];
  // Search and filter products
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.barcode.includes(query);
      const matchesCategory =
        category === "All" || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);
  // Add a product to the cart
  function addToCart(product) {
    if (product.stock < 1) {
      alert("This product is out of stock.");
      return;
    }
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (item) => item.id === product.id
      );
      const currentQuantity = existingItem
        ? existingItem.quantity
        : 0;
      if (currentQuantity >= product.stock) {
        alert("You cannot add more than the available stock.");
        return previousCart;
      }
      if (existingItem) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...previousCart, { ...product, quantity: 1 }];
    });
  }
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <h1 className="mb-6 text-2xl font-bold">
        Supermarket POS
      </h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Product section */}
        <section className="lg:col-span-2">
          {/* Search input */}
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product name or barcode..."
            className="mb-4 w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-5 w-full rounded-lg border bg-white p-3"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {/* Product display */}
          {filteredProducts.length === 0 ? (
            <p className="rounded-lg bg-white p-6 text-gray-500">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-xl bg-white p-3 shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-3 h-28 w-full rounded-lg object-contain"
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                  />
                  <h2 className="font-semibold">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>
                  <p className="mt-2 font-bold text-blue-600">
                    ₦{product.price.toLocaleString("en-NG")}
                  </p>
                  <p className="my-2 text-sm text-gray-600">
                    Stock: {product.stock}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    disabled={product.stock < 1}
                    className="w-full rounded-lg bg-blue-600 p-2 text-sm text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                  >
                    {product.stock < 1
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
        {/* Cart section */}
        <aside className="h-fit rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">
            Current Sale
          </h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">
              No products added yet.
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-3 border-b py-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ₦
                    {item.price.toLocaleString("en-NG")}
                  </p>
                </div>
                <p className="font-semibold">
                  ₦
                  {(item.price * item.quantity).toLocaleString(
                    "en-NG"
                  )}
                </p>
              </div>
            ))
          )}
          <div className="mt-5 flex justify-between border-t pt-4">
            <span className="font-bold">Total</span>
            <span className="text-xl font-bold">
              ₦{cartTotal.toLocaleString("en-NG")}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
export default POS;

import toast from "react-hot-toast";
import { useProducts } from "../context/productProvider";
import { useCashier } from "../context/CashierContext";
import { useMemo, useState } from "react";

function POS() {
  const { products, updateProduct } = useProducts();
 const { cashier, addSale } = useCashier();
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
        String(product.barcode).toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  // Add a product to the cart
  function addToCart(product) {
    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    const currentQuantity = existingItem
      ? existingItem.quantity
      : 0;

    if (currentQuantity >= product.stock) {
      toast.success(
        product.stock < 1
          ? "This product is out of stock."
          : "You cannot add more than the available stock."
      );
      return;
    }

    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  }

  // Change quantity in cart
  function changeQuantity(productId, amount) {
    const product = products.find(
      (item) => item.id === productId
    );

    if (!product) return;

    setCart((previousCart) =>
      previousCart
        .map((item) => {
          if (item.id !== productId) return item;

          const quantity = item.quantity + amount;

          if (quantity > product.stock) {
            toast.success("Not enough stock available.");
            return item;
          }

          return { ...item, quantity };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Complete sale and deduct stock
  function completeSale() {
    if (cart.length === 0) {
      toast.success("Your cart is empty.");
      return;
    }

    // Validate every item before updating any stock
    const stockError = cart.some((item) => {
      const product = products.find(
        (product) => product.id === item.id
      );

      return !product || product.stock < item.quantity;
    });
    addSale({
  items: cart.map((item) => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    subtotal: item.price * item.quantity,
  })),
  total: cartTotal,
});

toast.success(
  `Sale completed by ${cashier.name}! Total: ₦${cartTotal.toLocaleString("en-NG")}`
);
    if (stockError) {
      toast.success("Stock has changed. Please review your cart.");
      setCart([]);
      return;
    }

    cart.forEach((item) => {
      const product = products.find(
        (product) => product.id === item.id
      );

      updateProduct(product.id, {
        stock: product.stock - item.quantity,
      });
    });

    toast.success(
      `Sale completed! Total: ₦${cartTotal.toLocaleString("en-NG")}`
    );

    setCart([]);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="flex justify-between">
        <h1 className="mb-6 text-2xl font-bold">
        Supermarket POS
      </h1>
      <p className="mb-4 text-sm text-gray-600">
       Cashier: <span className="font-semibold">{cashier.name}</span>
        </p>
      </div>
      

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Products */}
        <section className="lg:col-span-2">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product name or barcode..."
            className="mb-4 w-full rounded-lg border bg-white p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

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

                  {product.stock <= product.lowStockThreshold && (
                    <p className="mb-2 text-xs font-semibold text-red-600">
                      Low stock
                    </p>
                  )}

                  <button
                    onClick={() => addToCart(product)}
                    disabled={
                      product.stock < 1 ||
                      (cart.find((item) => item.id === product.id)
                        ?.quantity ?? 0) >= product.stock
                    }
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

        {/* Cart */}
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
                <div className="min-w-0">
                  <p className="font-medium">{item.name}</p>

                  <p className="text-sm text-gray-500">
                    ₦{item.price.toLocaleString("en-NG")} each
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => changeQuantity(item.id, -1)}
                      className="rounded bg-gray-200 px-3 py-1"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => changeQuantity(item.id, 1)}
                      disabled={item.quantity >= (
                        products.find((p) => p.id === item.id)?.stock ?? 0
                      )}
                      className="rounded bg-gray-200 px-3 py-1 disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="font-semibold">
                  ₦{(item.price * item.quantity).toLocaleString("en-NG")}
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

          <button
            onClick={completeSale}
            disabled={cart.length === 0}
            className="mt-4 w-full rounded-lg bg-green-600 p-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Complete Sale
          </button>
        </aside>
      </div>
    </div>
  );
}

export default POS;


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
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [completedSale, setCompletedSale] = useState(null);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        String(product.barcode ?? "").toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  function addToCart(product) {
    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    const currentQuantity = existingItem
      ? existingItem.quantity
      : 0;

    if (product.stock < 1 || currentQuantity >= product.stock) {
      toast.error(
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
            toast.error("Not enough stock available.");
            return item;
          }

          return { ...item, quantity };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  // Open the payment section
  function proceedToPayment() {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setPaymentMethod("Cash");
    setShowPayment(true);
  }

  // Confirm payment, save sale, and deduct stock
  function completeSale() {
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    // Check stock BEFORE recording the sale
    const stockError = cart.some((item) => {
      const product = products.find(
        (product) => product.id === item.id
      );

      return !product || product.stock < item.quantity;
    });

    if (stockError) {
      toast.error("Stock has changed. Please review your cart.");
      setCart([]);
      setShowPayment(false);
      return;
    }

    const sale = {
      id: `SALE-${Date.now()}`,
      date: new Date().toISOString(),
      cashier: cashier?.name || "Unknown Cashier",
      paymentMethod,
      items: cart.map((item) => ({
        id: item.id,
        productId: item.id,
        name: item.name,
        price: Number(item.price),
        quantity: Number(item.quantity),
        subtotal: Number(item.price) * Number(item.quantity),
      })),
      subtotal: cartTotal,
      total: cartTotal,
    };

    // Record the completed sale
    addSale(sale);

    // Deduct stock exactly once for this sale
    cart.forEach((item) => {
      const product = products.find(
        (product) => product.id === item.id
      );

      updateProduct(product.id, {
        stock: product.stock - item.quantity,
      });
    });

    setCompletedSale(sale);
    setCart([]);
    setShowPayment(false);

    toast.success("Sale completed! Your receipt is ready.");
  }

  function printReceipt() {
    window.print();
  }

  const money = (amount) =>
    Number(amount).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="mb-6 flex flex-wrap justify-between gap-3">
        <h1 className="text-2xl font-bold">Supermarket POS</h1>

        <p className="text-sm text-gray-600">
          Cashier:{" "}
          <span className="font-semibold">
            {cashier?.name || "Unknown"}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* PRODUCTS */}
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
                  className=" rounded-xl bg-white p-3 shadow-sm"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="mb-3 h-28 w-full rounded-lg object-contain"
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                  />

                  <h2 className="font-semibold">{product.name}</h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>

                  <p className="mt-2 font-bold text-blue-600">
                    {money(product.price)}
                  </p>

                  <p className="my-2 text-sm text-gray-600">
                    Stock: {product.stock}
                  </p>

                  {product.stock <=
                    (product.lowStockThreshold ?? 5) && (
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
                    className="w-full rounded-lg bg-blue-600 p-2 text-sm text-white hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {product.stock < 1 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CART */}
        <aside className="h-fit rounded-xl bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">Current Sale</h2>

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
                    {money(item.price)} each
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
                      disabled={
                        item.quantity >=
                        (products.find((p) => p.id === item.id)
                          ?.stock ?? 0)
                      }
                      className="rounded bg-gray-200 px-3 py-1 disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="font-semibold">
                  {money(item.price * item.quantity)}
                </p>
              </div>
            ))
          )}

          <div className="mt-5 flex justify-between border-t pt-4">
            <span className="font-bold">Total</span>
            <span className="text-xl font-bold">
              {money(cartTotal)}
            </span>
          </div>

          <button
            onClick={proceedToPayment}
            disabled={cart.length === 0}
            className="mt-4 w-full rounded-lg bg-green-600 p-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            Proceed to Payment
          </button>
        </aside>
      </div>

      {/* PAYMENT SECTION */}
      {showPayment && (
        <div className="no-print fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="mb-2 text-2xl font-bold">
              Complete Payment
            </h2>

            <p className="mb-5 text-gray-500">
              Select how the customer paid.
            </p>

            <div className="mb-5 grid grid-cols-2 gap-3">
              {["Cash", "Bank Transfer"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`rounded-xl border-2 p-4 font-semibold transition ${
                    paymentMethod === method
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            <div className="mb-6 flex justify-between border-t pt-4">
              <span className="font-semibold">Amount to pay</span>
              <span className="text-xl font-bold">
                {money(cartTotal)}
              </span>
            </div>

            <button
              onClick={completeSale}
              className="w-full rounded-lg bg-green-600 p-3 font-bold text-white hover:bg-green-700"
            >
              Confirm Payment & Print Receipt
            </button>

            <button
              onClick={() => setShowPayment(false)}
              className="mt-3 w-full rounded-lg bg-gray-200 p-3 font-semibold hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* RECEIPT PREVIEW */}
      {completedSale && (
        <div className="no-print fixed inset-0 z-[60] overflow-y-auto bg-black/60 p-4">
          <div className="mx-auto my-8 max-w-md rounded-xl bg-white p-4 shadow-2xl">
            <div className="mb-4 flex gap-3">
              <button
                onClick={() => setCompletedSale(null)}
                className="flex-1 rounded-lg bg-gray-200 p-3 font-semibold"
              >
                Close
              </button>

              <button
                onClick={printReceipt}
                className="flex-1 rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
              >
                Print Receipt
              </button>
            </div>

            <div className="receipt-print-area bg-white p-4 font-mono text-sm text-black">
              <div className="border-b border-dashed border-black pb-3 text-center">
                <h2 className="text-xl font-bold">EXCELLENT SUPERMARKET</h2>
                <p>Sales Receipt</p>
                <p>Thank you for shopping with us!</p>
              </div>

              <div className="my-3 space-y-1">
                <p>Receipt No: {completedSale.id}</p>
                <p>
                  Date:{" "}
                  {new Date(completedSale.date).toLocaleString("en-NG")}
                </p>
                <p>Cashier: {completedSale.cashier}</p>
                <p>Payment: {completedSale.paymentMethod}</p>
              </div>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-y border-black">
                    <th className="py-2">Item</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {completedSale.items.map((item, index) => (
                    <tr key={item.id ?? index}>
                      <td className="py-2 pr-1">
                        {item.name}
                        <p className="text-xs">
                          {money(item.price)} each
                        </p>
                      </td>

                      <td className="text-center">{item.quantity}</td>

                      <td className="text-right">
                        {money(item.price * item.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-3 border-t border-dashed border-black pt-3">
                <div className="flex justify-between font-bold text-base">
                  <span>TOTAL</span>
                  <span>{money(completedSale.total)}</span>
                </div>
              </div>

              <div className="mt-5 border-t border-dashed border-black pt-3 text-center">
                <p>Thank you. Visit us again!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default POS;

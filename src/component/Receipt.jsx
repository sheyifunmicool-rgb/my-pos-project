
import React from "react";

const Receipt = ({ sale }) => {
  if (!sale) return null;

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="receipt bg-white text-black p-4 w-full max-w-sm mx-auto font-mono text-sm">
      {/* Business information */}
      <div className="text-center border-b border-dashed border-black pb-3 mb-3">
        <h2 className="text-xl font-bold uppercase">
          Sydotcom Store
        </h2>

        <p>Thank you for shopping with us!</p>
        <p>Sales Receipt</p>
      </div>

      {/* Transaction details */}
      <div className="mb-3 space-y-1">
        <p>
          Receipt No: <strong>{sale.id}</strong>
        </p>

        <p>
          Date:{" "}
          {new Date(sale.date).toLocaleString("en-NG")}
        </p>

        <p>Cashier: {sale.cashier || "N/A"}</p>
      </div>

      <div className="border-b border-dashed border-black mb-3" />

      {/* Purchased products */}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-black">
            <th className="py-1">Item</th>
            <th className="py-1 text-center">Qty</th>
            <th className="py-1 text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {sale.items.map((item, index) => (
            <tr key={item.id ?? index}>
              <td className="py-2 pr-1">
                {item.name}
                <div className="text-xs">
                  {formatMoney(Number(item.price))} each
                </div>
              </td>

              <td className="text-center">
                {item.quantity}
              </td>

              <td className="text-right">
                {formatMoney(
                  Number(item.price) * Number(item.quantity)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-dashed border-black mt-3 pt-3 space-y-2">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{formatMoney(sale.subtotal)}</span>
        </div>

        <div className="flex justify-between font-bold text-base">
          <span>TOTAL:</span>
          <span>{formatMoney(sale.total)}</span>
        </div>

        <div className="flex justify-between">
          <span>Payment:</span>
          <span>{sale.paymentMethod || "Cash"}</span>
        </div>
      </div>

      <div className="text-center mt-5 border-t border-dashed border-black pt-3">
        <p>Goods purchased are appreciated!</p>
        <p>Thank you. Visit us again!</p>
      </div>
    </div>
  );
};

export default Receipt;
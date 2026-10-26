
import {
  createContext,
  useContext,
  useState,
} from "react";

const CashierContext = createContext(null);


export function CashierProvider({ children }) {
  const [cashier, setCashier] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("pos_cashier")
      );
    } catch {
      return null;
    }
  });

  const [sales, setSales] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("pos_sales")
      ) || [];
    } catch {
      return [];
    }
  });

  function login(name) {
    const loggedInCashier = {
      name: name.trim(),
    };

    localStorage.setItem(
      "pos_cashier",
      JSON.stringify(loggedInCashier)
    );

    setCashier(loggedInCashier);
  }

  function logout() {
    localStorage.removeItem("pos_cashier");
    setCashier(null);
  }

  function addSale(sale) {
    const newSale = {
      ...sale,
      id: crypto.randomUUID(),
      cashier: cashier.name,
      date: new Date().toISOString(),
    };

    setSales((previousSales) => {
      const updatedSales = [newSale, ...previousSales];

      localStorage.setItem(
        "pos_sales",
        JSON.stringify(updatedSales)
      );

      return updatedSales;
    });
  }

  return (
    <CashierContext.Provider
      value={{
        cashier,
        login,
        logout,
        sales,
        addSale,
      }}
    >
      {children}
    </CashierContext.Provider>
  );
}

export function useCashier() {
  const context = useContext(CashierContext);

  if (!context) {
    throw new Error(
      "useCashier must be used inside CashierProvider"
    );
  }

  return context;
}

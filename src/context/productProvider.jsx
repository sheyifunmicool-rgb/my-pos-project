import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { products as initialProducts } from "../data/product";
const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const savedProducts = localStorage.getItem("pos-products");

      return savedProducts
        ? JSON.parse(savedProducts)
        : initialProducts;
    } catch (error) {
      console.error("Failed to load products:", error);
      return initialProducts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("pos-products", JSON.stringify(products));
    } catch (error) {
      console.error("Failed to save products:", error);
    }
  }, [products]);

  const addProduct = (product) => {
    setProducts((currentProducts) => [
      ...currentProducts,
      {
        ...product,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const updateProduct = (id, updates) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? { ...product, ...updates }
          : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error(
      "useProducts must be used inside ProductProvider"
    );
  }

  return context;
}
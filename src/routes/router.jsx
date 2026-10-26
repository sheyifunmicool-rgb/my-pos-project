
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "../Pages/Dashboard";
import Products from "../Pages/Products";
import POS from "../Pages/pos";
import SalesHistory from "../Pages/SaleHistory";
import Inventory from "../component/ProductSearch";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pos" element={<POS />} />
      <Route path="/products"  element={<Products/>}/>
      <Route path="/inventory"  element={<Inventory/>}/>
      <Route path="/sales-history" element={<SalesHistory />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

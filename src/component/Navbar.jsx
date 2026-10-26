
import {Bell} from 'lucide-react';
import { useCashier } from "../context/CashierContext";
import { useProducts } from '../context/productProvider';
import { useNavigate } from "react-router-dom";

function Navbar() {
   const { products, updateProduct } = useProducts();
   const navigate = useNavigate();
   const lowStockCount = products.filter(
    (p) =>
      p.stock > 0 &&
      p.stock <= (p.lowStockThreshold ?? 5)
  ).length;
  const { cashier, sales, logout } = useCashier();
     const {name} = cashier
  return (
    <div className='flex items-center gap-3 justify-between bg-blue-700 shadow p-2.5  '>
      <div className='flex gap-4'>
        <h2 className='text-4xl font-bold text-amber-400'>EXCELLENT </h2>
        <h4 className='text-3xl text-amber-400'>SUPERMARKET</h4>
        </div>      
     <div className='flex gap-3'>
       <button  onClick={() => navigate("/inventory")} className="relative p-2">
        <Bell size={26} />

        <span className="absolute -top-1 -right-1
          flex h-5 min-w-5 items-center justify-center
          rounded-full bg-red-500 px-1
          text-xs font-bold text-white">
          {lowStockCount}
        </span>
      </button>
     <p className='text-sm'>weldone<br />
     <span className='text-black'>{name}</span>
     </p>
     </div>
     
    </div>
  )
}

export default Navbar

import {Bell} from 'lucide-react';

function Navbar() {
  return (
    <div className='flex items-center gap-3 justify-between bg-white shadow '>
      <div className='flex gap-4'>
        <h2 className='text-xl font-bold'>Loseyi mart</h2>
        <h4 className='text-sm text-gray-500'>POS system</h4>
        </div>      
     <input type="text" placeholder=' search products by name or barcode'
     className='w-96 rounded-lg border px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500' />
     <div className='flex gap-3'>
     <Bell size={22}/>
     <p className='text-sm'>funmi,<br />
     <span className='text-gray-500'>cashier</span>
     </p>
     </div>
     
    </div>
  )
}

export default Navbar
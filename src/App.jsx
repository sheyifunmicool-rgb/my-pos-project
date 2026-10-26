

import React from "react";
import  { Toaster}  from "react-hot-toast";
import Sidebar from "./component/Sidebar";
import Login from "./Pages/Login";
import AppRoutes from "./routes/router";
import Navbar from "./component/Navbar";

import { CashierProvider, useCashier } from "./context/CashierContext";

function AppContent() {
  const { cashier } = useCashier();

  if (!cashier) {
    return <Login />;
  }
 

  return (
    <div>
      <Navbar/>
       <Toaster position="top-center"
        />
      <div className="flex h-screen overflow-hidden">
      
      <aside className="h-screen w-64 shrink-0">
        <Sidebar />
      </aside>

      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <AppRoutes/>
      </main>
    </div>
    </div>
   
  );
}

function App() {
  return (
    <CashierProvider>
      <AppContent />
    </CashierProvider>
  );
}

export default App;

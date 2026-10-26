import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { ProductProvider } from './context/productProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProductProvider>
      <BrowserRouter>
       <App />
      </BrowserRouter>
    
    </ProductProvider>
  
  </StrictMode>,
)

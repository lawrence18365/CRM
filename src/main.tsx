import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CustomerProvider } from './context/CustomerContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomerProvider>
      <App />
    </CustomerProvider>
  </React.StrictMode>,
)
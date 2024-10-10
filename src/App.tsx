import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import CustomerDetails from './components/CustomerDetails';
import { CustomerProvider } from './context/CustomerContext';

function App() {
  return (
    <CustomerProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
            <Route path="/add-customer" element={<AddCustomer />} />
          </Routes>
        </Layout>
      </Router>
    </CustomerProvider>
  );
}

export default App;
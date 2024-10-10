import React, { createContext, useState, useEffect, useContext } from 'react';

export type Note = {
  text: string;
  date: string;
};

export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'lead' | 'customer';
  lastInteraction: string;
  notes?: Note[];
};

type CustomerContextType = {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, 'id' | 'lastInteraction'>) => void;
  updateCustomer: (id: number, updates: Partial<Customer>) => void;
  getCustomerById: (id: number) => Customer | undefined;
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers));
  }, [customers]);

  const addCustomer = (customer: Omit<Customer, 'id' | 'lastInteraction'>) => {
    const newCustomer = {
      ...customer,
      id: Date.now(),
      lastInteraction: new Date().toISOString(),
      notes: []
    };
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (id: number, updates: Partial<Customer>) => {
    setCustomers(customers.map(customer => 
      customer.id === id ? { ...customer, ...updates } : customer
    ));
  };

  const getCustomerById = (id: number) => {
    return customers.find(customer => customer.id === id);
  };

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, updateCustomer, getCustomerById }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};
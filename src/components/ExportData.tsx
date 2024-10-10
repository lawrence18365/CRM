import React from 'react';
import { useCustomers } from '../context/CustomerContext';

const ExportData: React.FC = () => {
  const { customers } = useCustomers();

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Company', 'Status', 'Last Interaction'],
      ...customers.map(customer => [
        customer.name,
        customer.email,
        customer.phone,
        customer.company,
        customer.status,
        new Date(customer.lastInteraction).toLocaleString()
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "customer_data.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button
      onClick={handleExport}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
    >
      Export Customer Data
    </button>
  );
};

export default ExportData;
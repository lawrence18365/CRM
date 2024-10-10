import React, { useState } from 'react';
import { useCustomers } from '../context/CustomerContext';
import Papa from 'papaparse';

const CSVUpload: React.FC = () => {
  const { addCustomer } = useCustomers();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          results.data.slice(1).forEach((row: any) => {
            if (row.length === 5) {
              addCustomer({
                name: row[0],
                email: row[1],
                phone: row[2],
                company: row[3],
                status: row[4] as 'lead' | 'customer',
              });
            }
          });
        },
        header: true,
      });
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Import Customers from CSV</h3>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100"
      />
      <button
        onClick={handleUpload}
        disabled={!file}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Upload CSV
      </button>
    </div>
  );
};

export default CSVUpload;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useCustomers } from '../context/CustomerContext';

const CustomerList: React.FC = () => {
  const { customers } = useCustomers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'lead' | 'customer'>('all');

  const filteredCustomers = customers.filter(customer => 
    (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     customer.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || customer.status === filterStatus)
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Customer List</h3>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'lead' | 'customer')}
              className="border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            >
              <option value="all">All</option>
              <option value="lead">Leads</option>
              <option value="customer">Customers</option>
            </select>
            <Filter className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {filteredCustomers.map((customer) => (
            <li key={customer.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <Link to={`/customers/${customer.id}`} className="block">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{customer.name}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      customer.status === 'lead' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {customer.status === 'lead' ? 'Lead' : 'Customer'}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      {customer.email}
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                      {customer.phone}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p>Last interaction: {new Date(customer.lastInteraction).toLocaleDateString()}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerList;
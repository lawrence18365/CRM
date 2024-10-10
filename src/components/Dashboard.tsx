import React from 'react';
import { Users, DollarSign, ShoppingCart, UserPlus } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useCustomers } from '../context/CustomerContext';
import ExportData from './ExportData';
import DailyChecklist from './DailyChecklist';
import Automations from './Automations';
import CSVUpload from './CSVUpload';

const Dashboard: React.FC = () => {
  const { customers } = useCustomers();

  const totalCustomers = customers.length;
  const totalLeads = customers.filter(c => c.status === 'lead').length;
  const totalActiveCustomers = customers.filter(c => c.status === 'customer').length;

  const customerData = [
    { name: 'Leads', value: totalLeads },
    { name: 'Active Customers', value: totalActiveCustomers },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  const recentCustomers = [...customers]
    .sort((a, b) => new Date(b.lastInteraction).getTime() - new Date(a.lastInteraction).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{totalCustomers}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserPlus className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Leads</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{totalLeads}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Customers</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{totalActiveCustomers}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Customer Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {customerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <DailyChecklist />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Customers</h3>
          <div className="flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {recentCustomers.map((customer) => (
                <li key={customer.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Users className="h-8 w-8 rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{customer.name}</p>
                      <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                    </div>
                    <div>
                      <a href="#" className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                        View
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Automations />
      </div>

      <CSVUpload />

      <div className="flex justify-end">
        <ExportData />
      </div>
    </div>
  );
};

export default Dashboard;
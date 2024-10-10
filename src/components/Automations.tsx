import React from 'react';
import { Clock, Mail, Bell } from 'lucide-react';

const Automations: React.FC = () => {
  const automations = [
    { id: 1, name: 'Follow-up Reminder', description: 'Sends a reminder to follow up with leads after 3 days of inactivity', icon: Clock },
    { id: 2, name: 'Welcome Email', description: 'Automatically sends a welcome email to new leads', icon: Mail },
    { id: 3, name: 'Task Notification', description: 'Notifies you of upcoming tasks and deadlines', icon: Bell },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Automations</h3>
      <ul className="space-y-4">
        {automations.map(automation => (
          <li key={automation.id} className="flex items-start">
            <div className="flex-shrink-0">
              <automation.icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{automation.name}</p>
              <p className="text-sm text-gray-500">{automation.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Automations;
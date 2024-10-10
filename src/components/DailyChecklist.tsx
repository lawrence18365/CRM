import React, { useState, useEffect } from 'react';
import { CheckSquare, Square } from 'lucide-react';

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

const DailyChecklist: React.FC = () => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    const savedChecklist = localStorage.getItem('dailyChecklist');
    return savedChecklist ? JSON.parse(savedChecklist) : [
      { id: 1, text: 'Review new leads', completed: false },
      { id: 2, text: 'Follow up with potential customers', completed: false },
      { id: 3, text: 'Update customer information', completed: false },
      { id: 4, text: 'Schedule demos or meetings', completed: false },
      { id: 5, text: 'Send out proposals', completed: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem('dailyChecklist', JSON.stringify(checklist));
  }, [checklist]);

  const toggleItem = (id: number) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const resetChecklist = () => {
    setChecklist(checklist.map(item => ({ ...item, completed: false })));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Checklist</h3>
      <ul className="space-y-3">
        {checklist.map(item => (
          <li key={item.id} className="flex items-center">
            <button onClick={() => toggleItem(item.id)} className="mr-2">
              {item.completed ? (
                <CheckSquare className="h-5 w-5 text-green-500" />
              ) : (
                <Square className="h-5 w-5 text-gray-400" />
              )}
            </button>
            <span className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={resetChecklist}
        className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
      >
        Reset Checklist
      </button>
    </div>
  );
};

export default DailyChecklist;
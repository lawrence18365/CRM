import React, { useState } from 'react';
import { useCustomers } from '../context/CustomerContext';

interface NotesProps {
  customerId: number;
}

const Notes: React.FC<NotesProps> = ({ customerId }) => {
  const { getCustomerById, updateCustomer } = useCustomers();
  const customer = getCustomerById(customerId);
  const [newNote, setNewNote] = useState('');

  const handleAddNote = () => {
    if (newNote.trim() && customer) {
      const updatedNotes = [
        ...(customer.notes || []),
        { text: newNote, date: new Date().toISOString() }
      ];
      updateCustomer(customerId, { notes: updatedNotes });
      setNewNote('');
    }
  };

  if (!customer) return null;

  return (
    <div className="mt-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Notes</h4>
      <div className="space-y-4">
        {customer.notes && customer.notes.map((note, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-700">{note.text}</p>
            <p className="text-xs text-gray-500 mt-1">{new Date(note.date).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
          rows={4}
          placeholder="Add a new note..."
        />
        <button
          onClick={handleAddNote}
          className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default Notes;
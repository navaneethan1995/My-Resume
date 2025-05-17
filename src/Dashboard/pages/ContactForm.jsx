import React, { useEffect, useState } from 'react';
import {
  getContacts,
  updateContact,
  deleteContact,
} from '../../Services/ContactService';

const ContactForm = () => {
  const [contacts, setContacts] = useState([]);
  const [editContact, setEditContact] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      setContacts(response.data);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    }
  };

  const handleEdit = (contact) => {
    setEditContact(contact);
    setIsSidebarOpen(true);
    setMessage(null);
  };

  const handleAdd = () => {
    setEditContact({ type: '', details: '', icon: '' });
    setIsSidebarOpen(true);
    setMessage(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editContact.id) {
        await updateContact(editContact.id, editContact);
        setMessage({ type: 'success', text: 'Contact updated successfully!' });
      } else {
        // You'll need to implement addContact in ContactService
        await createContact(editContact); // Implement this function
        setMessage({ type: 'success', text: 'Contact added successfully!' });
      }
      fetchContacts();
      setEditContact(null);
      setIsSidebarOpen(false);
    } catch (error) {
      console.error('Submit error:', error);
      setMessage({ type: 'error', text: 'Failed to submit contact.' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      fetchContacts();
      setMessage({ type: 'success', text: 'Contact deleted successfully!' });
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Contact List</h2>

      <button
        onClick={handleAdd}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Contact
      </button>

      {message && (
        <p className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Type</th>
              <th className="py-3 px-4 text-left">Details</th>
              <th className="py-3 px-4 text-left">Icon</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-b hover:bg-gray-100 transition-colors">
                <td className="py-2 px-4">{contact.type}</td>
                <td className="py-2 px-4">{contact.details}</td>
                <td className="py-2 px-4">{contact.icon}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => handleEdit(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No contact data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Sidebar Form */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-lg p-6 z-50 transition-transform duration-300">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">
            {editContact?.id ? 'Edit Contact' : 'Add Contact'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type:</label>
              <input
                name="type"
                value={editContact.type}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Details:</label>
              <input
                name="details"
                value={editContact.details}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Icon:</label>
              <select
                name="icon"
                value={editContact.icon}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500"
              >
                <option value="">Select an icon</option>
                <option value="📞">Phone</option>
                <option value="📧">Email</option>
                <option value="🏠">Address</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editContact?.id ? 'Update' : 'Add'}
              </button>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ContactForm;

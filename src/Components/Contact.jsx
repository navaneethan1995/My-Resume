import React, { useEffect, useState } from 'react';
import axios from 'axios';   
import { FaHome, FaPhone, FaEnvelope } from 'react-icons/fa';
import Snowfall from 'react-snowfall';
import { motion } from 'framer-motion';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ success: null, message: '' });

  
  useEffect(() => {
    axios.get('/data/data.json')
      .then((response) => {
        setContacts(response.data.aboutMe?.info || []);
      })
      .catch((error) => {
        console.error('Error loading contact data:', error);
      });
  }, []);

  const iconMap = {
    home: <FaHome size={24} />,
    phone: <FaPhone size={24} />,
    mail: <FaEnvelope size={24} />,
    email: <FaEnvelope size={24} />,
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: '' });

    try {
      const response = await sendMessage(form);
      setStatus({ success: true, message: response.data.message });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Something went wrong.';
      setStatus({ success: false, message: errMsg });
    }
  };

  return (
    <section className="bg-[#0f172a] min-h-screen flex items-center justify-center p-5 relative">
      <Snowfall
        snowflakeCount={100}
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
      />
      <div className="w-full max-w-6xl rounded-lg p-8 grid md:grid-cols-2 gap-8 text-white relative z-10">

        {/* Left Side: Contact Info */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl font-bold">Contact Information</h2>
          <p className="text-gray-300">Feel free to reach out to us using the details below.</p>

          <div className="space-y-6 mt-6">
            {contacts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="bg-white text-black rounded-full p-3">
                  {iconMap[item.icon?.toLowerCase()] || <span>{item.icon}</span>}
                </div>
                <div>
                  <h4 className="font-bold text-cyan-400">{item.type}</h4>
                  <p>{item.details}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 text-black space-y-4 shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Send Message</h3>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border-b-2 p-2 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border-b-2 p-2 outline-none"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Type your Message..."
            className="w-full border-b-2 p-2 outline-none resize-none"
            rows="4"
            required
          />
          <button
            type="submit"
            className="w-full bg-cyan-400 hover:bg-cyan-500 text-white py-2 rounded font-bold transition duration-300"
          >
            Send
          </button>

          {status.message && (
            <p className={`text-sm font-semibold ${status.success ? 'text-green-600' : 'text-red-600'}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;

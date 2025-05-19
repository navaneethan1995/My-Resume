import React, { useEffect, useState } from 'react';
import Snowfall from 'react-snowfall';
import DownloadCV from './DownloadCV';
import { motion } from 'framer-motion';
import axios from 'axios';

const AboutMe = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/data/data.json')
      .then((res) => {
        const json = res.data;
        const info = {
          ...json,
          ...json.aboutMe,
        };

        // Ensure resume URL is valid if needed
        if (info.resume && !info.resume.startsWith('http')) {
          info.resume = `${info.resume}`;
        }

        setData(info);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading local data.json:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white text-xl">
        Loading your personal info...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white text-xl">
        Something went wrong. Please try again later.
      </div>
    );
  }

  const imageUrl = data.aboutImage || '/default-profile.jpg';

  return (
    <section className="relative min-h-screen bg-[#0f172a] text-white overflow-hidden">
      <Snowfall
        snowflakeCount={100}
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
      />

      <div className="relative z-10 p-8 flex flex-col lg:flex-row gap-10 lg:ml-20 lg:mr-10">
        <motion.div
          className="flex-1 mt-20"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 border-b-4 border-blue-500 inline-block">About Me</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold flex items-center gap-2">
                <span className="text-blue-400">📄</span> Bio
              </h3>
              <p className="text-gray-300 mt-2">{data.bio || 'No bio available'}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="p-4 bg-[#1e293b] rounded-xl">
                <h4 className="text-xl font-semibold flex items-center gap-2 mb-2">
                  <span className="text-blue-400">🎓</span> Education
                </h4>
                <p className="font-bold">{data.education?.degree || 'Degree not available'}</p>
                <p className="text-gray-400">{data.education?.institution || 'Institution not available'}</p>
                <p className="text-gray-400">{data.education?.duration || 'Duration not available'}</p>
              </div>

              <div className="p-4 bg-[#1e293b] rounded-xl">
                <h4 className="text-xl font-semibold flex items-center gap-2 mb-4">
                  <span className="text-blue-400">💼</span> Experience
                </h4>
                {data.experience?.length > 0 ? (
                  <ul className="space-y-2">
                    {data.experience.map((exp, idx) => (
                      <li key={idx} className="text-gray-300">
                        <p className="font-semibold">{exp.role}</p>
                        <p className="text-sm text-gray-400">{exp.company}</p>
                        <p className="text-sm text-gray-400">{exp.duration}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">No experience data available</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-start gap-4 mt-20 lg:mr-10"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            <img
              src={imageUrl}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
            />
            <div className="absolute bottom-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
              {data.gpa || 'GPA not available'}
            </div>
          </div>

          <h3 className="text-2xl font-bold">{data.name || 'Your Name'}</h3>
          <p className="text-gray-400">{data.role?.[0] || 'Your Role'}</p>

          <DownloadCV buttonText="Download CV" />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;

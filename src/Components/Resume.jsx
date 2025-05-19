import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Snowfall from 'react-snowfall';
import { motion } from 'framer-motion';

const Resume = () => {
  const [personalInfo, setPersonalInfo] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/data/data.json')
      .then((res) => {
        const data = res.data;
        setPersonalInfo({
          name: data.name,
          bio: data.aboutMe.bio,
          degree: data.aboutMe.education.degree,
          institution: data.aboutMe.education.institution,
          duration: data.aboutMe.education.duration,
          gpa: data.aboutMe.gpa,
        });
        setExperiences(data.aboutMe.experience || []);
        setContactInfo(data.aboutMe.info || []); // ✅ FIXED: Correct path
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10 text-white">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <section className="px-6 md:px-30 sm:py-20 py-20 bg-[#0f172a] text-white relative min-h-screen overflow-hidden">
      <Snowfall
        snowflakeCount={100}
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <h2 className="text-4xl font-bold border-b-4 border-blue-500 inline-block mb-6">Resume</h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Summary and Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4">Summary</h3>
            <div className="relative pl-8 border-l-2 border-blue-500 mb-10">
              <div className="absolute left-[-8px] top-0 bg-white border-2 border-blue-500 rounded-full w-4 h-4"></div>
              <h4 className="text-xl font-semibold">{personalInfo?.name}</h4>
              <p className="italic mt-2">{personalInfo?.bio}</p>

              <ul className="space-y-2 mt-4">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="bg-white text-black rounded-full p-2 text-sm">
                      {item.icon === 'home' && '🏠'}
                      {item.icon === 'phone' && '📞'}
                      {item.icon === 'mail' && '✉️'}
                    </div>
                    <div>
                      <span className="font-semibold text-cyan-400">{item.type}</span>: {item.details}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="text-2xl font-bold mb-4">Education</h3>
            <div className="relative pl-8 border-l-2 border-blue-500 space-y-8">
              <div className="relative">
                <div className="absolute left-[-40px] top-0 bg-white border-2 border-blue-500 rounded-full w-4 h-4"></div>
                <h4 className="text-lg font-semibold">{personalInfo?.degree}</h4>
                <p>{personalInfo?.duration}</p>
                <p className="italic mt-1">{personalInfo?.institution}</p>
                <p className="mt-2">GPA: {personalInfo?.gpa}</p>
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold mb-4 lg:ml-20">Professional Experience</h3>
            <div className="relative border-l-2 border-blue-500 space-y-8 lg:ml-20">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="absolute left-[-10px] top-0 bg-white border-2 border-blue-500 rounded-full w-4 h-4"></div>
                  <h4 className="text-lg font-semibold pl-10">{exp.role}</h4>
                  <p className="pl-10">{exp.duration}</p>
                  <p className="italic mt-1 pl-10">{exp.company}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;

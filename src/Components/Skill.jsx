import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Snowfall from 'react-snowfall';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/data/data.json')
      .then((res) => {
        const skillsData = res.data.aboutMe?.skills || [];
        setSkills(skillsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 text-white">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <section className="relative py-16 px-6 md:px-20 bg-[#0A0F24] text-white overflow-hidden">
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
        <div className="text-center mb-10 mt-7">
          <h2 className="text-4xl font-bold mb-4 mt-10">Skills</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            I've worked with a range of technologies in the web development world, from frontend to backend and everything in between.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {skills.length > 0 ? (
            skills.map((skillCategory, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4 mt-10">
                  <span className="text-2xl">{skillCategory.icon}</span>
                  <h3 className="text-xl font-semibold">{skillCategory.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillCategory.items.length > 0 ? (
                    skillCategory.items.map((item, idx) => (
                      <span key={idx} className="bg-white/10 text-sm px-3 py-1 rounded-full">{item}</span>
                    ))
                  ) : (
                    <span>No skills available</span>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <p>No skills found</p>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;

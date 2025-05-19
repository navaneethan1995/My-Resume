import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Snowfall from 'react-snowfall';
import axios from 'axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/data/data.json');
        const data = response.data;

        if (Array.isArray(data.aboutMe?.projects)) {
          setProjects(data.aboutMe.projects);
        } else {
          setError('Projects data is missing or malformed.');
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Error fetching projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center py-10 text-white">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!projects.length) return <div className="text-center py-10 text-white">No projects available</div>;

  return (
    <section className="px-6 md:px-30 py-10 bg-[#0f172a] text-white min-h-screen relative">
      <Snowfall
        snowflakeCount={100}
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
      />

      <div className="text-center mb-10 mt-10 relative z-10">
        <h2 className="text-4xl font-bold">
          Project <span className="text-green-400">Showcase</span>
        </h2>
      </div>

      <motion.div
        className="grid md:grid-cols-2 gap-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5 }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-green-400">{project.title}</h3>
            <p className="text-gray-300">{project.description}</p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-green-300 underline"
              >
                View Project
              </a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;

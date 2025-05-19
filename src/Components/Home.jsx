import React, { useEffect, useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import DownloadCV from './DownloadCV';
import Snowfall from 'react-snowfall';
import { motion } from 'framer-motion';
import axios from 'axios';
import './style.css';

const HeroSection = () => {
  const [heroData, setHeroData] = useState(null);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/data/data.json');
        const data = response.data;

        data.role = Array.isArray(data.role)
          ? data.role
          : typeof data.role === 'string'
            ? data.role.split(',').map((r) => r.trim())
            : [];

        setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!heroData?.role || heroData.role.length === 0) return;

    const typeSpeed = 100;
    const pauseAfterTyping = 2000;
    const currentRole = heroData.role[currentRoleIndex];
    const totalTime = currentRole.length * typeSpeed + pauseAfterTyping;

    const timer = setTimeout(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % heroData.role.length);
    }, totalTime);

    return () => clearTimeout(timer);
  }, [currentRoleIndex, heroData]);

  if (!heroData) return <div className="text-center mt-10">Loading...</div>;

  const resumeUrl = '/Greetings.pdf'; 

  return (
    <div
      className="min-h-screen w-full text-white bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${heroData.backgroundImage})`
      }}
    >
      <Snowfall
        snowflakeCount={100}
        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 0 }}
      />
      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen bg-black/10 backdrop-blur-[1px]">

    
        <motion.div
          className="lg:w-1/2 flex items-center justify-center p-4"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-[5px] rounded-full shadow-lg animate-spin-slow mt-20 lg:mt-0">
            <img
              src={heroData.heroImage}
              alt="Hero"
              className="w-[300px] h-[300px] object-cover rounded-full"
            />
          </div>
        </motion.div>

       
        <motion.div
          className="lg:w-1/2 flex flex-col justify-center items-start p-10 text-left"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2 }}
        >
          <span className="bg-yellow-400 text-sm px-2 py-1 rounded-full font-semibold text-black">
            {heroData.greeting}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold mt-4">{heroData.name}</h1>

          <p className="mt-4 text-2xl font-semibold px-4 py-2 rounded">
            <Typewriter
              words={[heroData.role[currentRoleIndex]]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={0}
            />
          </p>

          <DownloadCV buttonText="Download CV" />

          <div className="flex gap-4 mt-10">
            <a
              href="https://www.linkedin.com/feed/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700"
            >
              <FaLinkedin className="cursor-pointer" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;

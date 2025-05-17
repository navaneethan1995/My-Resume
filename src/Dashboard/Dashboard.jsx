import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import RightSidebarForm from './RightSidebarForm';
import Skills from './pages/SkillsForm';
import Projects from './pages/ProjectsForm';
import About from './pages/AboutForm';
import Contact from './pages/ContactForm';
import Experience from './pages/ExperienceSection';
import DownloadCV from '../Components/DownloadCV';

const Dashboard = () => {
  const [selectedPage, setSelectedPage] = useState();
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const renderPage = () => {
    const commonProps = {
      onEdit: (data) => { setEditingData(data); setShowForm(true); },
      onOpenForm: () => setShowForm(true),
    };
    switch (selectedPage) {
      case 'skills': return <Skills {...commonProps} />;
      case 'projects': return <Projects {...commonProps} />;
      case 'experience': return <Experience {...commonProps} />;
      case 'about': return <About {...commonProps} />;
      case 'contact': return <Contact {...commonProps} />;
      case 'download_cv': return <DownloadCV {...commonProps} />;
      default: return <div >Select a page</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar onSelect={setSelectedPage} />
      <div className="flex-1 p-4 overflow-auto relative">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
        {renderPage()}
      </div>
      {showForm && (
        <RightSidebarForm
          initialData={editingData}
          onClose={() => { setShowForm(false); setEditingData(null); }}
        />
      )}
    </div>
  );
};

export default Dashboard;

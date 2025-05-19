import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import NavbarWithSidebar from "./Components/Navbar";
import Home from './Components/Home';
import About from './Components/About_Me';
import Skills from "./Components/Skill";
import Resume from "./Components/Resume";
import Project from "./Components/Project";
import Contact from "./Components/Contact";


function AppWrapper() {
  return (
    <div className="App">
      {!shouldHideNavbar && <NavbarWithSidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

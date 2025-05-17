import { useState, useEffect } from "react";
import { FaSave, FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";
import { getProjects, createProject, updateProject, deleteProject } from "../../Services/ProjectService";

const ProjectsForm = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [newProject, setNewProject] = useState({
    id: null,
    title: "",
    description: "",
    link: ""
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch the list of projects from the database
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setMessage({ type: "error", text: "Failed to load projects. Please try again." });
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectChange = (field, value) => {
    setNewProject({ ...newProject, [field]: value });
  };

  const openSidebarForCreate = () => {
    setNewProject({ id: null, title: "", description: "", link: "" });
    setSidebarOpen(true);
  };

  const openSidebarForEdit = (project) => {
    setNewProject({ ...project });
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      if (newProject.id) {
        // Update existing project
        await updateProject(newProject.id, newProject);
        setMessage({ type: "success", text: "Project updated successfully!" });
      } else {
        // Create new project
        await createProject(newProject);
        setMessage({ type: "success", text: "Project added successfully!" });
      }
      // Reload project list after saving
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Error saving project:", error);
      setMessage({ type: "error", text: "Failed to save project. Please try again." });
    } finally {
      setSaving(false);
      closeSidebar();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        setMessage({ type: "success", text: "Project deleted successfully!" });
        // Reload project list after deleting
        const response = await getProjects();
        setProjects(response.data);
      } catch (error) {
        console.error("Error deleting project:", error);
        setMessage({ type: "error", text: "Failed to delete project. Please try again." });
      }
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading projects...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Projects</h2>

      {message.text && (
        <div className={`p-4 mb-6 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message.text}
        </div>
      )}

      {/* Project Table */}
      <table className="min-w-full bg-white border border-gray-200 shadow-md mb-6">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Link</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className="py-2 px-4 border-b">{project.title}</td>
              <td className="py-2 px-4 border-b">{project.description}</td>
              <td className="py-2 px-4 border-b">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {project.link}
                </a>
              </td>
              <td className="py-2 px-4 border-b flex justify-between">
                <button onClick={() => openSidebarForEdit(project)} className="text-blue-500 hover:text-blue-700 flex items-center gap-1">
                  <FaEdit size={14} />
                  Edit
                </button>
                <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700 flex items-center gap-1">
                  <FaTrash size={14} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add New Project Button */}
      <button onClick={openSidebarForCreate} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 flex items-center gap-2">
        <FaPlus />
        Add New Project
      </button>

      {/* Sidebar Form for Create/Edit Project */}
      {sidebarOpen && (
        <div className="fixed inset-0  bg-opacity-50 z-50 flex justify-end items-start">
          <div className="bg-white p-6 rounded-lg w-full sm:w-1/2 h-full overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{newProject.id ? "Edit Project" : "Add New Project"}</h3>
              <button onClick={closeSidebar} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-gray-700">Project Title</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => handleProjectChange("title", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Description</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => handleProjectChange("description", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Project Link (optional)</label>
                  <input
                    type="url"
                    value={newProject.link}
                    onChange={(e) => handleProjectChange("link", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button type="button" onClick={closeSidebar} className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 flex items-center gap-2"
                  disabled={saving}
                >
                  <FaSave />
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;

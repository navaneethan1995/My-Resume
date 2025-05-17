import { useEffect, useState } from "react";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../Services/ExperienceService";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    duration: "",
  });

  const fetchData = async () => {
    try {
      const res = await getExperiences();
      setExperiences(res.data);
    } catch (err) {
      console.error("Failed to fetch experiences:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateExperience(editingId, formData);
        console.log("Experience updated");
      } else {
        await createExperience(formData);
        console.log("Experience created");
      }
      setFormVisible(false);
      setEditingId(null);
      setFormData({ role: "", company: "", duration: "" });
      fetchData();
    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
    }
  };

  const handleEdit = (exp) => {
    setEditingId(exp.id);
    setFormData({ role: exp.role, company: exp.company, duration: exp.duration });
    setFormVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteExperience(id);
      fetchData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Experiences</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ role: "", company: "", duration: "" });
            setFormVisible(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Experience
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Role</th>
              <th className="p-2">Company</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id} className="border-b">
                <td className="p-2">{exp.role}</td>
                <td className="p-2">{exp.company}</td>
                <td className="p-2">{exp.duration}</td>
                <td className="p-2 flex gap-2">
                  <button className="text-yellow-600" onClick={() => handleEdit(exp)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-600" onClick={() => handleDelete(exp.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {formVisible && (
        <div className="fixed top-0 right-0 w-full sm:w-[400px] bg-white h-full shadow-lg p-6 overflow-y-auto z-50">
          <h3 className="text-lg font-bold mb-4">
            {editingId ? "Edit" : "Add"} Experience
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Role"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="Duration"
              className="w-full border p-2 rounded"
              required
            />
            <div className="flex justify-between">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                {editingId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => setFormVisible(false)}
                className="bg-gray-300 px-4 py-2 rounded"
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

export default ExperienceSection;

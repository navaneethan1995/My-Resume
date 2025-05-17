import { useEffect, useState } from "react";
import {
  getPersonalInfo,
  createPersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
} from "../../Services/PersonalInfoService";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const url = import.meta.env.VITE_API_BASE_URL;


const AboutSection = () => {
  const [data, setData] = useState([]);
  console.log("datadatadata",data);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    greeting: "",
    name: "",
    role: [""],
    button_text: "",
    bio: "",
    gpa: "",
    degree: "",
    institution: "",
    duration: "",
    background_image: null,
    hero_image: null,
    about_image: null,
    resume: null,
    background_image_preview: null,
    hero_image_preview: null,
    about_image_preview: null,
    resume_preview: null,
  });
  console.log("url",url);

  const fetchData = async () => {
    try {
      const response = await getPersonalInfo();
      const raw = Array.isArray(response.data) ? response.data : [response.data];

      const normalized = raw.map((item) => ({
        ...item,
        role: Array.isArray(item.role)
          ? item.role
          : typeof item.role === "string"
          ? item.role.split(",").map((r) => r.trim())
          : [],
      }));

      setData(normalized);
    } catch (err) {
      console.error("Fetch failed:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (info) => {
    setEditingId(info.id);
    setFormData({
      greeting: info.greeting || "",
      name: info.name || "",
      role: Array.isArray(info.role) ? info.role : [],
      button_text: info.button_text || "",
      bio: info.bio || "",
      gpa: info.gpa || "",
      degree: info.degree || "",
      institution: info.institution || "",
      duration: info.duration || "",
      background_image: null,
      hero_image: null,
      about_image: null,
      resume: null,
      background_image_preview: info.background_image,
      hero_image_preview: info.hero_image,
      about_image_preview: info.about_image,
      resume_preview: info.resume ? info.resume.split("/").pop() : null,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this info?")) return;
    try {
      await deletePersonalInfo(id);
      fetchData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
        [`${name}_preview`]:
          name === "resume" ? file.name : URL.createObjectURL(file),
      }));
    } else if (name === "role") {
      setFormData((prev) => ({ ...prev, role: value.split(",") }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && !key.includes("_preview")) {
        if (key === "role" && Array.isArray(val)) {
          val.forEach((r, i) => formPayload.append(`role[${i}]`, r));
        } else {
          formPayload.append(key, val);
        }
      }
    });

    try {
      if (editingId) {
        await updatePersonalInfo(editingId, formPayload);
      } else {
        await createPersonalInfo(formPayload);
      }
      setShowForm(false);
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error("Submit failed:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">About Information</h2>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({
              greeting: "",
              name: "",
              role: [""],
              button_text: "",
              bio: "",
              gpa: "",
              degree: "",
              institution: "",
              duration: "",
              background_image: null,
              hero_image: null,
              about_image: null,
              resume: null,
              background_image_preview: null,
              hero_image_preview: null,
              about_image_preview: null,
              resume_preview: null,
            });
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Info
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table-auto w-full text-left text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Greeting</th>
              <th className="p-2">Bio</th>
              <th className="p-2">Role</th>
              <th className="p-2">GPA</th>
              <th className="p-2">Degree</th>
              <th className="p-2">Institution</th>
              <th className="p-2">Images</th>
              <th className="p-2">Resume</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((info) => (
              <tr key={info.id} className="border-b">
                <td className="p-2">{info.name}</td>
                <td className="p-2">{info.greeting}</td>
                <td className="p-2">{info.bio}</td>
                <td className="p-2">{info.role.join(", ")}</td>
                <td className="p-2">{info.gpa}</td>
                <td className="p-2">{info.degree}</td>
                <td className="p-2">{info.institution}</td>
                <td className="p-2 space-x-2">
                  {["background_image", "hero_image", "about_image"].map((key) =>
                    info[key] ? (
                      <img
                        key={key}
                        src={`${info[key]}`}
                        alt={key}
                        className="w-12 h-12 object-cover inline-block"
                      />
                    ) : null
                  )}
                </td>
                <td className="p-2">
                  {info.resume ? (
                    <a
                      href={info.resume.startsWith("http") ? info.resume : `${url}/storage/uploads/${info.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Download
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="p-2 flex gap-2">
                  <button className="text-yellow-600" onClick={() => handleEdit(info)}>
                    <FaEdit />
                  </button>
                  <button className="text-red-600" onClick={() => handleDelete(info.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed top-0 right-0 w-full sm:w-[400px] bg-white h-full shadow-lg p-6 overflow-y-auto z-50">
          <h3 className="text-lg font-bold mb-4">
            {editingId ? "Edit" : "Create"} Info
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              "greeting",
              "name",
              "button_text",
              "bio",
              "gpa",
              "degree",
              "institution",
              "duration",
            ].map((field) => (
              <input
                key={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.replace("_", " ").toUpperCase()}
                className="w-full border p-2 rounded"
              />
            ))}

            <input
              type="text"
              name="role"
              value={formData.role.join(",")}
              onChange={handleChange}
              placeholder="Role (comma separated)"
              className="w-full border p-2 rounded"
            />

            {["background_image", "hero_image", "about_image"].map((img) => (
              <div key={img}>
                <label className="block text-sm font-medium mb-1">
                  {img.replace("_", " ").toUpperCase()}
                </label>
                <label className="bg-blue-500 text-white px-3 py-2 rounded cursor-pointer inline-block">
                  Choose File
                  <input
                    type="file"
                    name={img}
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
                {formData[`${img}_preview`] && (
                  <img
                    src={formData[`${img}_preview`]}
                    alt="Preview"
                    className="mt-2 w-20 h-20 object-cover rounded"
                  />
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-1">Resume (PDF)</label>
              <label className="bg-blue-500 text-white px-3 py-2 rounded cursor-pointer inline-block">
                Choose File
                <input
                  type="file"
                  name="resume"
                  accept=".pdf"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
              {formData.resume_preview && (
                <p className="mt-2 text-sm text-gray-600">{formData.resume_preview}</p>
              )}
            </div>

            <div className="flex justify-between">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                {editingId ? "Update" : "Create"}
              </button>
              <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AboutSection;

import { useEffect, useState } from "react"
import { getSkills, createSkill, updateSkill, deleteSkill } from "../../Services/SkillService";
import { FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa"

const defaultFormState = {
  id: null,
  category: "",
  icon: "",
  items: [""],
}

const SkillsForm = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [form, setForm] = useState(defaultFormState)
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await getSkills()
      const normalized = res.data.map(skill => ({
        ...skill,
        items: Array.isArray(skill.items)
          ? skill.items
          : typeof skill.items === "string"
          ? skill.items.split(",").map(i => i.trim())
          : [],
      }))
      setSkills(normalized)
    } catch (err) {
      console.error(err)
      setMessage({ type: "error", text: "Failed to load skills" })
    } finally {
      setLoading(false)
    }
  }

  const openSidebar = (skill = defaultFormState) => {
    setForm(skill)
    setIsEditing(!!skill.id)
    setSidebarOpen(true)
  }

  const closeSidebar = () => {
    setForm(defaultFormState)
    setSidebarOpen(false)
  }

  const handleFormChange = (field, value) => {
    setForm({ ...form, [field]: value })
  }

  const handleItemChange = (index, value) => {
    const updated = [...form.items]
    updated[index] = value
    setForm({ ...form, items: updated })
  }

  const addItem = () => {
    setForm({ ...form, items: [...form.items, ""] })
  }

  const removeItem = (index) => {
    const updated = [...form.items]
    updated.splice(index, 1)
    setForm({ ...form, items: updated })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (isEditing) {
        await updateSkill(form.id, form)
        setMessage({ type: "success", text: "Skill updated" })
      } else {
        await createSkill(form)
        setMessage({ type: "success", text: "Skill created" })
      }
      fetchSkills()
      closeSidebar()
    } catch (err) {
      console.error(err)
      setMessage({ type: "error", text: "Operation failed" })
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteSkill(id)
      fetchSkills()
      setMessage({ type: "success", text: "Skill deleted" })
    } catch (err) {
      console.error(err)
      setMessage({ type: "error", text: "Failed to delete" })
    }
  }

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          onClick={() => openSidebar()}
        >
          <FaPlus />
          Add Skill
        </button>
      </div>

      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message.text}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2 border">Category</th>
              <th className="text-left p-2 border">Icon</th>
              <th className="text-left p-2 border">Items</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map(skill => (
              <tr key={skill.id}>
                <td className="p-2 border">{skill.category}</td>
                <td className="p-2 border">{skill.icon}</td>
                <td className="p-2 border">{skill.items?.join(", ")}</td>
                <td className="p-2 border flex gap-2 justify-center">
                  <button onClick={() => openSidebar(skill)} className="text-yellow-500 hover:underline">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(skill.id)} className="text-red-500 hover:underline">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      
      {sidebarOpen && (
        <div className="fixed top-0 right-0 w-full md:w-96 h-full bg-white shadow-lg p-6 z-50 overflow-y-auto transition-transform transform translate-x-0">
          <h3 className="text-xl font-semibold mb-4">{isEditing ? "Edit Skill" : "Add Skill"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Category</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={form.category}
                onChange={(e) => handleFormChange("category", e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Icon</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2"
                value={form.icon}
                onChange={(e) => handleFormChange("icon", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Skills</label>
              {form.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleItemChange(idx, e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                    required
                  />
                  {form.items.length > 1 && (
                    <button type="button" onClick={() => removeItem(idx)} className="text-red-500">
                      <FaTrash />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addItem} className="text-blue-600 hover:underline text-sm">
                + Add Skill
              </button>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={closeSidebar} className="px-4 py-2 border rounded">
                Cancel
              </button>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
                <FaSave />
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default SkillsForm

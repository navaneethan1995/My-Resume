const Sidebar = ({ onSelect }) => (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul className="space-y-2">
        {["skills", "projects", "experience", "about", "contact"].map((item) => (
          <li key={item} className="cursor-pointer hover:text-yellow-300" onClick={() => onSelect(item)}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
  
  export default Sidebar;
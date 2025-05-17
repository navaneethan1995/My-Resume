const RightSidebarForm = ({ initialData, onClose }) => {
    return (
      <div className="w-96 fixed right-0 top-0 h-full bg-white shadow-lg p-6 z-50 transition-transform transform translate-x-0">
        <button onClick={onClose} className="mb-4 text-red-500 float-right">Close</button>
        <h2 className="text-2xl mb-4">{initialData ? 'Edit' : 'Create'} Entry</h2>
        {/* Replace with actual form fields */}
        <form>
          <input type="text" defaultValue={initialData?.name || ''} placeholder="Name" className="border p-2 w-full mb-4" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2">Submit</button>
        </form>
      </div>
    );
  };
  
  export default RightSidebarForm;
  
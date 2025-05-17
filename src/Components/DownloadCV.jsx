import React from 'react';


const DownloadCV = ({ buttonText, resumeUrl }) => {
  if (!resumeUrl) return null;

  return (
    <a
      href={resumeUrl}
      target="_blank"
      download
      className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition "
    >
      Download CV
    </a>
  );
};

export default DownloadCV;

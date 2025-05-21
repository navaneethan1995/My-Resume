import React from 'react';

const DownloadCV = ({ buttonText = "Download CV" }) => {
  const resumeUrl = "/NavaneethaKrishnanResume.pdf"; 

  return (
    <a
      href={resumeUrl}
      download
      className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
    >
      {buttonText}
    </a>
  );
};

export default DownloadCV;




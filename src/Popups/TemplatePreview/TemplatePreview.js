import React from "react";

const TemplatePreview = ({ template, onClose }) => {
  return (
    <>
       <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 z-50 ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 mx-auto">
        <div className='flex flex-row justify-between items-center w-full'>
         <h2 className="text-md md:text-2xl font-bold mb-4">Preview Template</h2>
        
         <button
                onClick={onClose}
                className="ml-auto font-bold bg-transparent border-none text-black hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button></div>
      
          <div

          className="w-full h-96 overflow-scroll"
            dangerouslySetInnerHTML={{
              __html: template.template,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default TemplatePreview;

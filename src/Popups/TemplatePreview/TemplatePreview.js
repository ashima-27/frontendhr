import React from "react";

const TemplatePreview =({template,onClose})=>{
    return (
        <>
        <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg">
      <button
                onClick={onClose}
                className="ml-auto bg-transparent border-none text-gray-500 hover:text-gray-700 focus:outline-none"
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
              </button>
      <h4>{template.description}</h4>
         {/* <h2>{template.placeholder}</h2> */}
         <div dangerouslySetInnerHTML={{
                            __html: template.template,
                          }}></div>
       </div>
       </div>
        </>
    )
}

export default TemplatePreview;
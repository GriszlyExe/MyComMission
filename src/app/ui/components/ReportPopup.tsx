import React, { useState,useEffect } from "react";

interface ReportPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reportData: { targetType: string; targetId:string; description: string }) => void;
  title :string;
  targetId :string;
  targetType:string;
}

export default function ReportPopup({ isOpen, onClose, onSubmit,title,targetType,targetId }: ReportPopupProps) {
  //const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null; // Hide when not open

//   useEffect(() => {
//     if (isOpen) {
//       setReportType("");
//       setDescription("");
//     }
//   }, [isOpen]);

  const handleSubmit = () => {
    if (description && description.trim()!="") {
      onSubmit({ targetType,targetId, description });
      //setReportType("");
      setDescription("");
      onClose(); 
    }
  };

  const handleCancel = () => {
    //setReportType("");
    setDescription("");
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-[700px] relative">
        <h2 className="text-xl font-semibold mb-4">{title}</h2> {/* Dynamic header */}

        {/* Report Type Selection
        <label className="block mb-2 text-sm font-medium text-gray-700">Report Type</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="">Select</option>
          <option value="spam">Spam</option>
          <option value="harassment">Harassment</option>
          <option value="fake">Fake Profile</option>
        </select> */}

        {/* Description Input */}
        <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Describe the issue..."
        />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

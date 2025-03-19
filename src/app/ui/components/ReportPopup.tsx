import React, { useState,useEffect } from "react";

interface ReportPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reportData: { reportType: string; description: string }) => void;
}

export default function ReportPopup({ isOpen, onClose, onSubmit }: ReportPopupProps) {
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null; // Hide when not open

//   // Reset form when popup opens
//   useEffect(() => {
//     if (isOpen) {
//       setReportType("");
//       setDescription("");
//     }
//   }, [isOpen]);

  const handleSubmit = () => {
    if (reportType && description) {
      onSubmit({ reportType, description });
      setReportType("");
      setDescription("");
      onClose(); // Close popup after submitting
    }
  };

  const handleCancel = () => {
    // Reset form when closing
    setReportType("");
    setDescription("");
    onClose(); // Close popup without submitting
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-xl font-semibold mb-4">Report User</h2>

        {/* Report Type Selection */}
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
        </select>

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

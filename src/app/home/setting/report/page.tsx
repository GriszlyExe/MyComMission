'use client'
import Breadcrumbs from '@/app/ui/setting/breadcrumbs'
import { submitReport } from "@/service/reportService";
import React, { useState } from "react";

export default function ReportGeneralPage() {
    const [description, setDescription] = useState("");
    const [showSubmitReport, setShowSubmitReport] = useState(false);
    
    const onSubmit = async (reportData: { targetType: string; targetId:string;description: string }) => {
		console.log('clicked')
		await submitReport({ data: reportData });
    };
    
    const handleSubmit = () => {
        if (description && description.trim()!="") {
          const targetType="GENERAL";
          const targetId="1";
          onSubmit({ targetType,targetId, description });
          
          setDescription("");
          setShowSubmitReport(true);
          setTimeout(() => {
            setShowSubmitReport(false);
          }, 3000);
        }
      };
    
    return (
        <div className='max-w-2xl mx-auto p-6 space-y-4'>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Home', href: '/home' },
                    { label: 'Settings', href: '/home/setting' },
                    { label: 'Report Problem', href: '/home/setting/report', active: true },
                ]}
            />
            
            <div className=" p-6 rounded-lg   relative">
        <h2 className="text-xl font-semibold mb-4">Report any problem</h2> {/* Dynamic header */}


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
          {/* <button onClick={handleCancel} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button> */}
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Submit
          </button>
        </div>
      </div>

        { showSubmitReport && <div className="toast">
            <div className="alert bg-green-500 text-white border-none">
              <span>The report has been submitted</span>
            </div>
          </div> }
        </div>
    )
}

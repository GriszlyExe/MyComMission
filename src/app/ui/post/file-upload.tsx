import { useState } from "react";
import { Image01Icon } from "hugeicons-react";

export default function FileUpload() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to array

        // Check file limit
        if (files.length + selectedFiles.length > 4) {
            alert("You can only upload up to 4 images.");
            return;
        }

        // Convert file objects to previewable URLs
        const filePreviews = files.map(file => ({
            file,
            preview: URL.createObjectURL(file), // Generate image preview URL
        }));

        setSelectedFiles([...selectedFiles, ...filePreviews]);
    };

    const removeFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    return (
        <div className="flex flex-col my-3">            
            <div className="flex gap-2">
                <h2 className="mb-2">Sample artwork:</h2>

                {/* Hidden file input */}
                <input 
                    type="file" 
                    id="fileUpload" 
                    className="hidden" 
                    multiple 
                    accept="image/*" // Accept only images
                    onChange={handleFileChange}
                />

                {/* Custom upload button */}
                <label 
                    htmlFor="fileUpload" 
                    className="cursor-pointer bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-blue-600 transition"
                >   
                    <div className="flex gap-1">
                        <Image01Icon />
                        add artworks ({selectedFiles.length}/4)
                    </div>
                </label>    
            </div>

            {/* Image Previews */}
            <div className="mt-3 flex pl-2 flex-wrap gap-2 rounded-md h-[97px]">
                {selectedFiles.map((fileObj, index) => (
                    <div key={index} className="relative w-24 h-24">
                        <img 
                            src={fileObj.preview} 
                            alt="Preview" 
                            className="w-full h-full object-cover rounded-md border-2 border-gray-300"
                        />
                        <button 
                            className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-full" 
                            onClick={() => removeFile(index)}
                            type="button"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

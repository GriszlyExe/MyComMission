import { useRef } from "react";
import { X } from "lucide-react"; // Import close icon
import { FilePreview } from "@/common/interface";

interface FileUploadProps {
    selectedFiles: FilePreview[];
    setSelectedFiles: (files: FilePreview[]) => void;
}

export default function FileUpload({ selectedFiles, setSelectedFiles }: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files).map(file => ({
                file,
                preview: URL.createObjectURL(file),
            }));

            // Prevent exceeding 4 files
            if (selectedFiles.length + newFiles.length > 4) {
                alert("You can upload a maximum of 4 images.");
                return;
            }

            setSelectedFiles([...selectedFiles, ...newFiles]);
        }
    };

    // Remove selected image
    const removeImage = (index: number) => {
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(updatedFiles);
    };

    return (
        <div className="flex flex-col items-center">
            {/* Hidden File Input */}
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange} 
                multiple 
            />

            {/* Clickable Upload Area */}
            <div 
                className={`border-2 border-dashed p-4 rounded-md text-center cursor-pointer 
                            ${selectedFiles.length >= 4 ? "border-gray-300 cursor-not-allowed" : "hover:border-blue-500"}`} 
                onClick={() => {
                    if (selectedFiles.length < 4) {
                        fileInputRef.current?.click();
                    }
                }}
            >
                {selectedFiles.length < 4 ? "Click to upload files (Max: 4)" : "Maximum limit reached"}
            </div>

            {/* Image Previews */}
            {selectedFiles.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="relative group">
                            <img 
                                src={file.preview} 
                                alt="preview" 
                                className="w-24 h-24 object-cover rounded-md border shadow-md"
                            />
                            {/* Remove Button */}
                            <button 
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                                onClick={() => removeImage(index)}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

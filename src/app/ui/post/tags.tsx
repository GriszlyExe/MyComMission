'use client';

import { useState, useRef, useEffect } from "react";
import { X, ChevronDown, TagIcon } from "lucide-react";

export default function TagSelector() {
    const availableTags = [
        "Realism", "Semi-Realism", "Anime/Manga", "Chibi", "Portrait", "Fan Art", "OC", "Digital Art",
        "Traditional Art", "Watercolor", "Oil Painting", "Pencil Sketch", "Pixel Art",
    ];
    const [selectedTags, setSelectedTags] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null); // Ref for detecting outside clicks

    const toggleTag = (tag) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const removeTag = (tag) => {
        setSelectedTags(selectedTags.filter(t => t !== tag));
    };

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Selected Tags */}
            <div className="flex items-center flex-wrap gap-1 p-2 rounded-md min-h-[40px]">
                {selectedTags.map(tag => (
                    <div key={tag} className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-full mb-1">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1 text-sm">
                            <X size={14} />
                        </button>
                    </div>
                ))}
                
                {/* Dropdown Toggle */}
                <button 
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                    className="flex items-center px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                    <div className="gap-1 flex">
                        <TagIcon/>
                        Choose Tags
                    </div>
                    <ChevronDown className="ml-1" size={16} />
                </button>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 w-full bg-white border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                    {availableTags.map(tag => (
                        <button 
                            key={tag} 
                            type="button"
                            onClick={() => toggleTag(tag)} 
                            className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                                selectedTags.includes(tag) ? "bg-gray-200" : ""
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

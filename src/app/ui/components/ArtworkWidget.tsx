import { Artwork, Post, User } from "@/common/model";
import PostWidget from "./PostWidget";
import { RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface ArtworkProps {
    artwork: Artwork;
    user: User;
}

export default function ArtworkWidget({ artwork, user }: ArtworkProps) {
    const images = [artwork.imageUrl]
        .map((url) => {
            return { file: undefined, preview: url };
        });
    
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="group cursor-pointer" >
            {/* Image */}
            {images.length > 0 && <div className="relative h-64 overflow-hidden">
                <img
                    src={images[0].preview || "/path/to/default/image.jpg"}
                    alt=""
                    className="h-full w-full object-cover transition-all duration-300 group-hover:opacity-75 group-hover:brightness-50"
                    onClick={() => {
                        setSelectedImage(images[0].preview);
                    }}
                />
            </div>}

            {/* Modal */}
            {selectedImage && (
                <ImageModal
                    imageSrc={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    );
}

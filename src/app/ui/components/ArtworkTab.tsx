import ArtworkWidget from "./ArtworkWidget";
import { useAppSelector } from "@/stores/hook";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getArtworksByUserId } from "@/service/commissionService";

export default function ArtworkTab() {
    const [artworks, setArtworks] = useState([]);
    const { id } = useParams() as { id: string };

    useEffect(() => {

        getArtworksByUserId(id).then(({ artworks, artist }) => {
            setArtworks(artworks || []);
            console.log("Artworks:", artworks)
        });
        
    }, []);

    return (
        <div className="grid grid-cols-3 gap-2 p-4">
            {artworks.map((artwork: any) => (
                <ArtworkWidget key={artwork.artworkId} artwork={artwork} user={artwork.artist} />
            ))}
        </div>
    );
}

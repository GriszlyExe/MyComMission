import ArtworkWidget from "./ArtworkWidget";
import { useAppDispatch, useAppSelector } from "@/states/hook";
import { useEffect } from "react";
import { getPostByUserId } from "@/service/postService";
import {
    setLoggedInUserPosts,
    setPagePosts,
} from "@/states/features/postSlice";
import { useParams } from "next/navigation";

export default function ArtworkTab() {
    const dispatch = useAppDispatch();
    const posts = useAppSelector((state) => state.post.pagePosts);
    const loggedInUser = useAppSelector((state) => state.user.user!);
    const { id } = useParams();

    useEffect(() => {

        getPostByUserId(loggedInUser.userId).then(({ posts, artist }) => {
            
            if (id && id === loggedInUser.userId) {
                dispatch(setLoggedInUserPosts(posts));
            }
            dispatch(setPagePosts(posts));
        });
        
    }, []);

    return (
        <div className="grid grid-cols-3 gap-2 p-4">
            {posts.map((post) => (
                <ArtworkWidget key={post.postId} post={post} user={loggedInUser} />
            ))}
        </div>
    );
}

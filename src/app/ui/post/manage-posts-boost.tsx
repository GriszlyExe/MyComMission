import FeedProfileWidget from "../components/FeedProfileWidget";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import { useEffect, useState } from "react";
import { getBoostedPostsByUserId, getPostByUserId } from "@/service/postService";
import { useParams } from "next/navigation";
import UnboostedPostWidget from "../components/unboostedPostWidget";
import ManageBoostedPost from "./manage-boosted-post";
import PostBoostingButton from "./post-boosting-button";
import { Post } from "@/common/model";

export default function ManagePostsBoosting() {

    const dispatch = useAppDispatch();
    const [posts, setPosts] = useState<Post[]>()
    const loggedInUser = useAppSelector((state) => state.user.user!);
    const { id } = useParams();

    // State to track selected post IDs
    useEffect(() => {
        getBoostedPostsByUserId(loggedInUser.userId).then((data) => {
            console.log("hello", data);
            setPosts(data)
        });
    }, []);

    // console.log("boosted", posts);

    return (
        <div className="mt-1 max-h-[720px] sm:max-h-[460px] overflow-y-auto overflow-x-hidden scrollbar-hidden rounded-md">
            {/* <div className="  flex flex-row justify-between bg-gray-200 p-2"> */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-3">
                <h1 className="text-2xl text-accent font-semibold">Active Boosted Posts</h1>
                <PostBoostingButton />
            </div>
            <div className="grid gap-2">
                {posts && [...posts]
                    .sort(
                        (post1, post2) =>
                            new Date(post2.createdAt).getTime() -
                            new Date(post1.createdAt).getTime(),
                    )
                    .map((post) => (
                        <ManageBoostedPost
                            key={post.postId}
                            post={post}
                            user={loggedInUser}
                        />
                    ))}
            </div>
        </div>
    );
}
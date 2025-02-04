"use client";

import { useState } from "react";
import { FaHeart, FaRegHeart, FaRegCommentDots } from "react-icons/fa";
import Image from "next/image";
import PostWidget from "../post/edit-form";
import { PostData } from "@/common/interface";

interface PostProps {
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  timestamp: string;
}

const dummy_data: PostData = {
  name: "dummy name",
  description: "dummy description",
  tags: ["Realistic"],
  price: "10000",
  samples: [],
};

export default function Post({ user, content, image, timestamp }: PostProps) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(likes + (liked ? -1 : 1));
  };

  return (
    <div className="card w-full max-w-lg bg-white p-4 shadow-xl border-2 border-purple-600">
      {/* Post Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-xs text-gray-500">{timestamp}</p>
          </div>
        </div>
        {/* <button className="btn btn-ghost btn-sm">⋮</button> */}
        <PostWidget post={dummy_data} />
      </div>

      {/* Post Content */}
      <p className="mt-3 text-gray-800">{content}</p>
      {image && (
        <div className="mt-3 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt="Post Image"
            width={500}
            height={300}
            className="rounded-lg"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="mt-3 flex items-center space-x-4">
        <button
          className="btn btn-ghost btn-sm flex items-center space-x-2"
          onClick={toggleLike}
        >
          {liked ? (
            <FaHeart className="h-5 w-5 text-red-500" />
          ) : (
            <FaRegHeart className="h-5 w-5 text-gray-600" />
          )}
          <span>{likes}</span>
        </button>
        <button className="btn btn-ghost btn-sm flex items-center space-x-2">
          <FaRegCommentDots className="h-5 w-5 text-gray-600" />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
}

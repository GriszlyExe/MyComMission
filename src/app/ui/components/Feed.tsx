import Post from "./PostWidget";

const dummyPosts = [
  {
    id: 1,
    user: { name: "Alice Johnson", avatar: "/avatar.png" },
    tags: ["Realism", "Traditional Art"],
    content: "Loving this Next.js tutorial! 🚀",
    image: "/post.jpeg",
    timestamp: "5 mins ago",
  },
  {
    id: 2,
    user: { name: "Michael Smith", avatar: "/avatar.png" },
    tags: [
      "Semi-Realism",
      "Oil Painting",
      "Traditional Art",
      "Watercolor",
      "Pencil Sketch",
      "Pixel Art",
    ],
    content: "Just had an amazing burger 🍔!",
    image: "/post.jpeg",
    timestamp: "30 mins ago",
  },
  {
    id: 3,
    user: { name: "Sophia Brown", avatar: "/avatar.png" },
    tags: ["Fan Art", "Pixel Art"],
    content: "Enjoying the sunset at the beach 🌅",
    image: "/cover-photo.png",
    timestamp: "1 hour ago",
  },
];

export default function Feed() {
  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {dummyPosts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

import Post from "./Post";

const dummyPosts = [
  {
    id: 1,
    user: { name: "Alice Johnson", avatar: "/avatar.png" },
    content: "Loving this Next.js tutorial! 🚀",
    image: "/post.jpeg",
    timestamp: "5 mins ago",
  },
  {
    id: 2,
    user: { name: "Michael Smith", avatar: "/avatar.png" },
    content: "Just had an amazing burger 🍔!",
    image: "/post.jpeg",
    timestamp: "30 mins ago",
  },
  {
    id: 3,
    user: { name: "Sophia Brown", avatar: "/avatar.png" },
    content: "Enjoying the sunset at the beach 🌅",
    image: "/post.jpeg",
    timestamp: "1 hour ago",
  },
];

export default function Feed() {
  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      {dummyPosts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

import Feed from "@/app/ui/components/Feed";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-purple-100 p-6">
      <h1 className="mb-6 text-2xl font-bold">Social Feed</h1>
      <Feed />
    </div>
  );
}

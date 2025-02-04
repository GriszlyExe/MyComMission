import Feed from "@/app/ui/components/Feed";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-primary p-6">
      <div className="bg-secondary p-5 rounded-md">
        <h1 className="mb-6 text-2xl font-bold text-[#424874]">Social Feed</h1>
        <Feed />
      </div>
    </div>
  );
}

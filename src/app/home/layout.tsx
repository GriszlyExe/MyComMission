import TopNav from '@/app/ui/global/nav-bar';
import { Mail01Icon, Call02Icon, Location01Icon } from 'hugeicons-react';

export const experimental_ppr = true

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-none w-full">
        <TopNav />
      </div>
      <div className="flex-grow mt-1 p-6 md:overflow-y-auto md:p-12 bg-gray-50">
        {children}
      </div>
    </div>
  );
}

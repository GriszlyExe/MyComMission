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
      
      <footer className="bg-gray-100 w-full py-4 text-center">
        <div className='flex flex-row justify-between px-28 m-4'>
          <div className='flex flex-col w-80 gap-y-3'>
            <h1 className='text-xl font-bold'>Contact Us</h1>
            {/* Email */}
            <div className='flex gap-2 pl-12'>
              <Mail01Icon/>
              <p>contact@lorem.co.th</p>
            </div>

            {/* Tel. */}
            <div className='flex gap-2 pl-12'>
              <Call02Icon/>
              <p>+66(0)12-345-6789</p>
            </div>

            {/* Company. */}
            <div className='flex pl-12 '>
              <Location01Icon/>
              <div className='max-w-48'>
                <p>999 Hogsmeade Rd., Rivia, Skyrim, Tamriel 12345</p>
              </div>
            </div>
          </div>
          
          {/* Subscription */}
          <div className='gap-y-3'>
            <h1 className='text-xl font-bold'>Subscribe to our newsletter</h1>
            <div className='flex mt-3 gap-x-2 w-96 p-2'>
              <input 
                type='email' 
                placeholder='Enter your email'
                className='rounded-md border-none flex-grow p-2'
              />
              <button
                className='rounded-lg text-white bg-gray-900 px-4 py-2 hover:opacity-70 transition-opacity duration-150'
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div>
          <p>Lorem Market Limited ©Copyright 2024</p>
        </div>
        
      </footer>
    </div>
  );
}

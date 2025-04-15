"use client";

import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { set } from 'react-hook-form';

const useAuthRedirect = (setAllowed: Dispatch<SetStateAction<boolean>>) => {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {

        setAllowed(false);
    
        const adminToken = Cookies.get('adminAuthToken');
        const token = Cookies.get('authToken');

        console.log(`Admin token: ${adminToken}`);
        console.log(`User token: ${token}`);

        const protectedRoutes = ['/home', '/profile', '/chat'];
        const isAdminRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');
        const isProtectedRoute = protectedRoutes.some((route) =>
            pathname.startsWith(route)
        );

        if (isAdminRoute && !adminToken) {
            // console.log(`No admin token found, Redirecting to root...`);
            router.replace('/');
        } else if (isProtectedRoute && !token) {
            // console.log('No token found, Redirecting to login...');
            router.replace('/login');
        } else {
            setAllowed(true);
        }


    }, [pathname, router]);
};

export default useAuthRedirect;

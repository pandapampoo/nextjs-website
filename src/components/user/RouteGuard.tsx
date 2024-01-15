'use client'
import { useState, useEffect, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';

type TRouteGuard = {
  children: React.ReactNode
}

export default function RouteGuard({ children }:TRouteGuard) {
    
    const [authorized, setAuthorized] = useState(false);

    const router = useRouter()
    const pathname = usePathname()

    // const Auth:any = useContext(AuthContext)
    // const { user } = Auth
    
    useEffect(() => {
        authCheck();
        
    }, [router]);

   const authCheck = async () => {
        // redirect to login page if accessing a private page and not logged in 
        const user = localStorage.getItem('auth');
        if (!user) {
            setAuthorized(false);
            router.replace(`/login?from=${pathname}`);
        } else {
            setAuthorized(true);
            router.replace(pathname)
        }
    }

    return (authorized && children);
}
'use client'
import Link from "next/link";
import MiniCart from '@/components/cart/MiniCart';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
export interface ISideMenuProps {
}

export function SideMenu(props: ISideMenuProps) {

  const Auth: any = useContext(AuthContext)
  const { user } = Auth
  return (
    <div className="header-right inline-flex item-center content-center">
      {user ? (
        <>
          <Link href="/profile" className='mx-2'>Hi, {user?.display_name}</Link>
          <Link href="/logout" className='mx-2'>Log out</Link>
        </>
      ) : (
        <>
          <Link href="/login" className='mx-2'>Log in</Link>
          <Link href="/sign-up" className='mx-2'>Sign up</Link>
        </>
      )
      }
      <Link href="/search" className='mx-2'>Search</Link>
      <MiniCart />
    </div>
  );
}

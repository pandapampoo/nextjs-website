'use client'
import useAuth from "@/hooks/useAuth";
import { TUser } from "@/types/TUser";
import { createContext } from "react";

export type TAuthContext = {
  user: TUser | null
  logout?: ()=>void
  login?: ( username: string, password: string )=> void
}
export const AuthContext = createContext<TAuthContext | null>(null);

export const AuthProvider = ({ children }: any) => {
  const authHooks = useAuth()
  return <AuthContext.Provider
    value={ authHooks }
  >
    {children}
  </AuthContext.Provider>
}
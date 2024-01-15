'use client'
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function LogoutPage () {
  const Auth = useContext(AuthContext)
  const router = useRouter()
  useEffect(()=>{
    Auth?.logout?.()
    router.push('/')
  },[])
  return (
    <div>
      
    </div>
  );
}

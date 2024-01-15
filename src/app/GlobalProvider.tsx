import { AuthProvider } from "@/context/AuthContext"
export function GlobalProvider({ children }: any) {
  return <AuthProvider>{children}</AuthProvider>
}
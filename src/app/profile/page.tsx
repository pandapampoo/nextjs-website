import { useContext, useEffect } from "react"
import ProfileInfo from "@/components/user/ProfileInfo";
import RouteGuard from "@/components/user/RouteGuard";

export default function Profile() {
  return (
    <RouteGuard>
      <main>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[70vh] lg:py-0">
            <ProfileInfo />
          </div>
        </section>
      </main>
    </RouteGuard>
  );
}

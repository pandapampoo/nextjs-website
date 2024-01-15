import LoginForm from "@/components/user/LoginForm";
export interface ILoginProps {
}

export default function Login(props: ILoginProps) {
  return (
    <main>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:min-h-[70vh] lg:py-0">
          <LoginForm/>
        </div>
      </section>    
    </main>
  );
}

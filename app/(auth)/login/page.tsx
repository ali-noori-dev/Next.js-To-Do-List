import LoginForm from "@/app/ui/forms/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex justify-center items-center h-20 w-full rounded-lg bg-primary p-3">
          <span className="text-white">Login to create tasks</span>
        </div>

        <LoginForm />

        <div className="text-sm text-gray-600 flex justify-center">
          <span>Don&apos;t have an account?</span>&nbsp;
          <Link
            href="/sign-up"
            className="text-primary cursor-pointer font-semibold"
          >
            Sing up
          </Link>
        </div>
      </div>
    </main>
  );
}

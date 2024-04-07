import Link from "next/link";
import SignUpForm from "../../ui/forms/sign-up-form";

export default function SignUp() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex justify-center items-center h-20 w-full rounded-lg bg-primary p-3">
          <span className="text-white">Sign up to create tasks</span>
        </div>
        <SignUpForm />

        <div className="text-sm text-gray-600 flex justify-center">
          <span>Already have an account?</span>&nbsp;
          <Link
            href="/login"
            className="text-primary cursor-pointer font-semibold"
          >
            Sing in
          </Link>
        </div>
      </div>
    </main>
  );
}

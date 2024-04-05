import SignUpForm from "../ui/sign-up-form";

export default function SignUp() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex justify-center items-center h-20 w-full rounded-lg bg-blue-500 p-3">
          <span className="text-white">Sign up to create tasks</span>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}

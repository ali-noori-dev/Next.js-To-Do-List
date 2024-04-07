import SignOutButton from "./sign-out-button";
import UserProfile from "./user-profile";

export default function Header() {
  return (
    <header className="bg-primary px-6 py-4 flex justify-between items-center">
      <UserProfile />
      <h1 className="text-white font-bold text-lg flex-1 text-center">
        Next.js To-Do List
      </h1>
      <SignOutButton />
    </header>
  );
}

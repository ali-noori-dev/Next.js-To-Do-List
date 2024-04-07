import { auth } from "@/auth";

export default async function UserProfile() {
  const session = await auth();
  const userData = session?.user;
  return (
    <div className="text-white flex-1">
      <div>Name: {userData?.name}</div>
      <div>Email: {userData?.email}</div>
    </div>
  );
}

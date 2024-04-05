import { auth } from "@/auth";

export default function Home() {
  auth().then((data) => {
    // console.log({ data });
  });

  return <main></main>;
}

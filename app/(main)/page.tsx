import { getTasks } from "../lib/data";

export default async function Home() {
  const tasks = await getTasks();
  return (
    <main className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[70%] min-h-[400px] m-[70px_auto]">
      {tasks.length ? <></> : <></>}
    </main>
  );
}

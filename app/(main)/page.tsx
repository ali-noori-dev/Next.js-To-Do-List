import { auth } from "@/auth";
import { getTasks } from "../lib/data";
import EmptyTodoMessage from "../ui/empty-todo-message";
import TaskInputForm from "../ui/forms/task-input-form";
import TaskItem from "../ui/task/task-item";

export default async function Home() {
  const session = await auth();
  const userData = session?.user;
  const tasks = await getTasks();

  const taskList = (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );

  return (
    <main className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[70%]  m-[40px_auto] pt-2">
      {userData && <TaskInputForm userData={userData} />}
      {tasks.length ? taskList : <EmptyTodoMessage />}
    </main>
  );
}

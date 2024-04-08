import { getTasks } from "../lib/data";
import EmptyTodoMessage from "../ui/empty-todo-message";
import TaskInputForm from "../ui/task-input-form";
import TaskList from "../ui/task-list";

export default async function Home() {
  const tasks = await getTasks();
  return (
    <main className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-[70%]  m-[40px_auto] pt-2">
      <TaskInputForm />
      {tasks.length ? <TaskList tasks={tasks} /> : <EmptyTodoMessage />}
    </main>
  );
}

import { Task } from "../types/definitions";
import TaskItem from "./task-item";

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <ul className="">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

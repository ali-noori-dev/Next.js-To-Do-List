import { Task } from "../types/definitions";

export default function TaskItem({ task }: { task: Task }) {
  return (
    <li className="flex items-center gap-4 p-4">
      <input type="checkbox" />
      <p>{task.description}</p>
    </li>
  );
}

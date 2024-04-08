import { Task } from "../../types/definitions";
import TaskCompletionForm from "../forms/task-completion-form";
import DeleteTaskIcon from "./delete-task-icon";

export default function TaskItem({ task }: { task: Task }) {
  return (
    <li className="py-3 px-6 flex items-center gap-4">
      <div className="flex items-center gap-4 flex-1 overflow-hidden">
        <TaskCompletionForm task={task} />
        <p>{task.description}</p>
      </div>

      <DeleteTaskIcon id={task.id} />
    </li>
  );
}

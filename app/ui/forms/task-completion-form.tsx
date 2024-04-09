"use client";

import { handleUpdateTask } from "@/app/lib/actions";
import toastService from "@/app/toast/toast.service";
import { Task } from "@/app/types/definitions";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";

export interface TaskCompletionState {
  status: null | "success" | "error";
  id: string;
}

export default function TaskCompletionForm({ task }: { task: Task }) {
  const initialState = { status: null, id: task.id };
  const [formState, formAction] = useFormState(handleUpdateTask, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (formState.status === "success") {
      toastService.success("Task updated successfully");
      router.refresh();
    } else if (formState.status === "error")
      toastService.error("Failed to update task. Please try again.");
  }, [formState, router]);

  return (
    <form action={formAction} ref={formRef}>
      <input
        id={task.id}
        name="completed"
        type="checkbox"
        checked={task.completed}
        onChange={() => formRef.current?.requestSubmit()}
      />
    </form>
  );
}

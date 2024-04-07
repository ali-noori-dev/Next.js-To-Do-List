"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { handleAddTask } from "../lib/actions";
import toastService from "../toast/toast.service";
import Input from "./input";
import LoadingSpinner from "./loading-spinner";

export default function TaskInputForm() {
  const [formState, formAction] = useFormState(handleAddTask, undefined);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState) {
      if (formState.status === "success") {
        formRef.current?.reset();
        router.refresh();
        toastService.success("Task added successfully");
      } else toastService.error("Failed to add task. Please try again.");
    }
  }, [formState, router]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="border-b-2 flex items-end"
    >
      <Input
        name="description"
        placeholder="Type here to add new task item..."
        required
        className="border-0 outline-none"
      />
      <AddButton />
    </form>
  );
}

function AddButton() {
  const { pending } = useFormStatus();
  return (
    <button className="mx-6 mb-1">
      {pending ? (
        <LoadingSpinner />
      ) : (
        <PaperAirplaneIcon className="h-6 w-6 text-gray-500" />
      )}
    </button>
  );
}

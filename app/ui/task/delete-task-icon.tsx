"use client";
import useModalState from "@/app/hooks/use-modal-state";
import { handleDeleteTask } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "../button";
import Modal from "../modal";

export default function DeleteTaskIcon({ id }: { id: string }) {
  const [formState, formAction] = useFormState(handleDeleteTask, id);
  const { pending } = useFormStatus();
  const modalState = useModalState();

  const confirmForm = (
    <form action={formAction}>
      <Button aria-disabled={pending}>Delete</Button>
    </form>
  );

  return (
    <div>
      <TrashIcon
        className="w-4 h-4 cursor-pointer text-red-500"
        onClick={modalState.openModal}
      />

      <Modal
        modalState={modalState}
        title="Confirm Task Deletion"
        confirmButton={confirmForm}
      >
        <p className="text-base text-black">
          Are you sure you want to delete this task?
        </p>
      </Modal>
    </div>
  );
}

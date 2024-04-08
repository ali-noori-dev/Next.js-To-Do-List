"use client";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";
import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { handleAddTask } from "../../lib/actions";
import toastService from "../../toast/toast.service";
import Input from "../input";
import LoadingSpinner from "../loading-spinner";

export default function TaskInputForm({ userData }: { userData: User }) {
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

  useEffect(() => {
    const channelName = `private-updates-${userData.userId}`;

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
      cluster: "ap3",
      channelAuthorization: {
        transport: "ajax",
        endpoint: "https://sample-api.heli.technology/auth/broadcasting",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userData.accessToken}`,
        },
      },
    });

    pusher.connection.bind("connected", function () {
      console.log("connected");
    });

    const channel1 = pusher.subscribe(channelName);

    channel1.bind("taskUpdated", function (data: any) {
      console.log({ data });
    });

    return () => {
      pusher.unsubscribe(channelName);
    };
  }, [userData]);

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

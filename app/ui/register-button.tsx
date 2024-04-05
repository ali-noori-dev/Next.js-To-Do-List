import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { useFormStatus } from "react-dom";
import { Button } from "./button";

export default function RegisterButton({ title }: { title: string }) {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      {title} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

import Image from "next/image";
export default function EmptyTodoMessage() {
  return (
    <div className="pb-10">
      <Image
        src="/empty_todo.svg"
        width={400}
        height={400}
        alt="don't have todo"
        className="m-auto"
      />
      <h1 className="text-center text-2xl font-bold mb-4">
        You don&apos;t have tasks
      </h1>
      <p className="text-center text-gray-400">
        Here you will be able to see the tasks you create and the ones assigned
        to you
      </p>
    </div>
  );
}

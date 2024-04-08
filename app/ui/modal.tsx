import clsx from "clsx";
import { ModalState } from "../hooks/use-modal-state";
import { Button } from "./button";

interface Props {
  modalState: ModalState;
  children: React.ReactNode;
  title: string;
  confirmButton: React.ReactNode;
}

export default function Modal({
  modalState,
  children,
  confirmButton,
  title,
}: Props) {
  const { open, closeModal } = modalState;
  return (
    <div
      className={clsx("w-full h-screen items-center justify-center absolute", {
        flex: open,
        hidden: !open,
      })}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-6 rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {title}
              </h3>

              <span className="cursor-pointer" onClick={closeModal}>
                ✕
              </span>
            </div>

            {children}

            <div className="flex items-center justify-end gap-2 mt-6">
              <Button
                onClick={closeModal}
                className=" bg-white border border-primary text-blue-500 hover:bg-gray-100 active:bg-gray-200"
              >
                Cancel
              </Button>

              {confirmButton}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

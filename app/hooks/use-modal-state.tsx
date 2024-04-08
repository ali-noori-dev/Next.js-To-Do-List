import { useState } from "react";

export interface ModalState {
  open: boolean;
  openModal: VoidFunction;
  closeModal: VoidFunction;
}

export default function useModalState(): ModalState {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return { open, openModal, closeModal };
}

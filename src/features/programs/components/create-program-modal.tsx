"use client";

import { ResponsiveModal } from "@/components/global/responsive-modal";
import { useModal } from "@/hooks/use-modal-store";
import { CreateProgramForm } from "./create-program-form";

export const CreateProgramModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createProgram";

  return (
    <ResponsiveModal open={isModalOpen} onOpenChange={onClose}>
      <CreateProgramForm />
    </ResponsiveModal>
  );
};

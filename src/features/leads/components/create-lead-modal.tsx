"use client";
import { ResponsiveModal } from "@/components/global/responsive-modal";

import { CreateLeadForm } from "./create-lead-form";
import { useModal } from "@/hooks/use-modal-store";

export const CreateLeadModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createLead";

  return (
    <ResponsiveModal open={isModalOpen} onOpenChange={onClose}>
      <CreateLeadForm onCancel={close} />
    </ResponsiveModal>
  );
};

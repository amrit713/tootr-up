"use client";

import { ResponsiveModal } from "@/components/global/responsive-modal";
import { useModal } from "@/hooks/use-modal-store";
import { UpdateLeadForm } from "./update-lead-form";

export const UpdateLeadModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "updateLead";

  return (
    <ResponsiveModal open={isModalOpen} onOpenChange={onClose}>
      <UpdateLeadForm />
    </ResponsiveModal>
  );
};

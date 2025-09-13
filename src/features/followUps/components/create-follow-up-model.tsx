"use client";

import { ResponsiveModal } from "@/components/global/responsive-modal";
import { CreateFollowUpForm } from "./create-follow-up-form";
import { useModal } from "@/hooks/use-modal-store";

export const CreateFollowUpModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createFollowUp";

  return (
    <ResponsiveModal open={isModalOpen} onOpenChange={onClose}>
      <CreateFollowUpForm />
    </ResponsiveModal>
  );
};

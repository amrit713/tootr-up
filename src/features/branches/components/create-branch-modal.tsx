"use client";
import { ResponsiveModal } from "@/components/global/responsive-modal";

import { useModal } from "@/hooks/use-modal-store";
import { CreateBranchForm } from "./create-branch-form";

export const CreateBranchModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createBranch";

  return (
    <ResponsiveModal open={isModalOpen} onOpenChange={onClose}>
      <CreateBranchForm />
    </ResponsiveModal>
  );
};

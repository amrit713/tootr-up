"use client";
import { ResponsiveModal } from "@/components/global/responsive-modal";

import { useModal } from "@/hooks/use-modal-store";
import { CreatePaymentForm } from "./create-payment-form";

export const CreatePaymentModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createPayment";

  return (
    <ResponsiveModal open={isModalOpen} onOpenChange={onClose}>
      <CreatePaymentForm />
    </ResponsiveModal>
  );
};

"use client";
import { ResponsiveModal } from "@/components/global/responsive-modal";

import { useModal } from "@/hooks/use-modal-store";
import { UpdatePaymentForm } from "./update-payment-form";

export const UpdatePaymentModal = ({
  dueAmount,
  id,
}: {
  dueAmount: number;
  id: string;
}) => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "updatePayment";

  return (
    <ResponsiveModal open={isModalOpen} onOpenChange={onClose}>
      <UpdatePaymentForm dueAmount={dueAmount} id={id} />
    </ResponsiveModal>
  );
};

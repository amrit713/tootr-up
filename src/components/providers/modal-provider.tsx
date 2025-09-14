"use client";

import { CreateFollowUpModal } from "@/features/followUps/components/create-follow-up-model";
import { CreateLeadModal } from "@/features/leads/components/create-lead-modal";
import { UpdateLeadModal } from "@/features/leads/components/update-lead-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateLeadModal />
      <UpdateLeadModal />

      <CreateFollowUpModal />
    </>
  );
};

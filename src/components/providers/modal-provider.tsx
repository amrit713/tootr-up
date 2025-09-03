"use client";

import { CreateLeadModal } from "@/features/leads/components/create-lead-modal";
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
    </>
  );
};

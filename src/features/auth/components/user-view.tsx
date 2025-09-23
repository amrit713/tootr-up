"use client";

import { ErrorState } from "@/components/global/error-state";
import { useGetUsers } from "../api/get-all-user";
import { UserTable } from "./user-table";
import { columns } from "./user-column";

export const UserView = () => {
  const { data, isError, isLoading } = useGetUsers();
  console.log("🚀 ~ UserView ~ users:", data);

  if (isError) {
    return (
      <ErrorState
        title="Oops! User Error"
        description="Something went wrong while loading your dashboard. Please try again."
      />
    );
  }

  return (
    <UserTable
      columns={columns}
      data={data?.users || []}
      isLoading={isLoading}
    />
  );
};

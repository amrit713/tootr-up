import { AdminApproved } from "@/features/auth/components/admin-approved";
import { BranchList } from "@/features/branches/components/branch-list";
import { Branches } from "@/features/branches/components/branches";
import { ProgramList } from "@/features/programs/components/program-list";

export const SettingView = () => {
  return (
    <div className="grid grid-cols-1 pb-4 lg:grid-cols-3 gap-4">
      <div className=" lg:col-span-2">
        <AdminApproved />
      </div>
      <ProgramList />

      <Branches />
      <BranchList />
    </div>
  );
};

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConfirm } from "@/hooks/use-confirm";
import { EditIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useDeleteProgram } from "../api/use-delete-program";
import { useUpdateProgram } from "../api/use-update-program";

interface Props {
  name: string;
  id: string;
}

export const ProgramCard = ({ name, id }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(name);
  const [drop, setDrop] = useState(false);

  const { mutate, isPending } = useDeleteProgram();
  const { mutate: updateProgram, isPending: updatePending } =
    useUpdateProgram();

  const [DeleteProgramDialog, deleteProgram] = useConfirm(
    `Delete ${name} program`,
    `Are you sure you want to delete ${name} program`
  );

  const handleEditingProgram = () => {
    updateProgram(
      { json: { name: value }, param: { id } },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleDeleteProgram = async () => {
    const ok = await deleteProgram();
    setDrop(false);
    if (!ok) return;
    mutate(
      { param: { id } },
      {
        onSuccess: () => {
          setIsEditing(!!id);
        },
      }
    );
  };

  return (
    <>
      <DeleteProgramDialog />
      <div className="group py-2 px-4 bg-neutral-50 capitalize dark:bg-neutral-900  flex items-center justify-between ">
        {isEditing ? (
          <div className=" w-full flex flex-col gap-2">
            <Input
              placeholder=""
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                size={"sm"}
                variant={"outline"}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button size={"sm"} onClick={handleEditingProgram}>
                Save
              </Button>
            </div>
          </div>
        ) : (
          <p className="">{name}</p>
        )}

        {!isEditing && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setIsEditing(!!id)}
              className="rounded-full "
            >
              <EditIcon />
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="rounded-full "
              onClick={handleDeleteProgram}
            >
              <TrashIcon className="text-rose-500" />
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

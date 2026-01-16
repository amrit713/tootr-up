import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  EditIcon,
  GraduationCap,
  MoreVertical,
  PlusIcon,
  ShieldAlertIcon,
  ShieldOffIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToggleStudentActivation } from "../api/use-toggle-activation";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteStudent } from "../api/use-delete-student";

function StudentDetail({
  name,
  id,
  image,
  isActive,
}: {
  name: string;
  image: string | null;
  id: string;
  isActive: boolean;
}) {
  const [DeleteStudentDialog, confirmDelete] = useConfirm(
    "Delete Student",
    "Are you sure you want to delete this student? This action cannot be undone.",
    "destructive"
  );
  const [ToggleStudentActivationDialog, confirmToggleStudentActivation] =
    useConfirm(
      "Toggle Student Activation",
      "Are you sure you want to toggle this student's activation status?"
    );

  const router = useRouter();
  const { mutate: toggleStudentActivation, isPending: togglePending } =
    useToggleStudentActivation();
  const { mutate: deleteStudent, isPending: deletePending } =
    useDeleteStudent();

  const handleDeleteStudent = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    deleteStudent(
      { param: { id } },
      {
        onSuccess: () => {
          router.push("/students");
        },
      }
    );
  };

  const handleToggleStudentActivation = async (toggle: boolean) => {
    const ok = await confirmToggleStudentActivation();
    if (!ok) return;
    toggleStudentActivation({ param: { id }, json: { isActive: toggle } });
  };
  return (
    <>
      <DeleteStudentDialog />
      <ToggleStudentActivationDialog />

      <div className=" flex justify-between ">
        <div className="flex gap-4 items-center">
          <div className="relative  ">
            <Avatar className="size-24 border-green-500/50 border-2 ">
              <AvatarFallback className="bg-green-500/15 text-4xl text-green-600  font-semibold">
                <GraduationCap className="size-12" />
              </AvatarFallback>
            </Avatar>

            <Button
              className=" rounded-full absolute right-0 -bottom-1.5 shadow-none "
              size={"icon"}
              variant={"secondary"}
            >
              {" "}
              <PlusIcon />
            </Button>
          </div>
          <div className="flex flex-col ">
            <p className="text-2xl capitalize font-semibold ">{name}</p>
            <p className="flex items-center text-muted-foreground gap-2 font-medium">
              <span className="size-2 rounded-full bg-green-500" /> STUDENT
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="rounded-full" size={"icon"}>
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/students/${id}/edit`)}
              disabled={togglePending || deletePending}
            >
              <EditIcon /> Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleToggleStudentActivation(!isActive)}
              disabled={togglePending || deletePending}
            >
              {isActive ? (
                <>
                  <ShieldOffIcon /> Disable
                </>
              ) : (
                <>
                  <ShieldAlertIcon /> Enable
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDeleteStudent}
              disabled={togglePending || deletePending}
            >
              <TrashIcon /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}

export default StudentDetail;

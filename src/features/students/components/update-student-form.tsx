"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

import { studentSchema, updateStudentSchema } from "@/schema";

import { useGetBranches } from "@/features/branches/api/use-get-branches";
import { StudentDetailType } from "@/types";
import { Gender } from "@/generated/prisma/browser";
import { snakeCaseToTitleCase } from "@/lib/utils";

import { GraduationCap, MapPin } from "lucide-react";
import { BranchProgramMultiSelect } from "./branch-program-multi-select";
import { Button } from "@/components/ui/button";
import { ButtonLoader } from "@/components/global/button-loader";
import { useUpdateStudent } from "../api/use-update-student";
import { DatePicker } from "@/components/global/date-picker";

interface UpdateStudentProps {
  student: StudentDetailType;
}

export const UpdateStudentForm = ({ student }: UpdateStudentProps) => {
  const router = useRouter();

  const { data: branches } = useGetBranches();
  const { mutate: updateStudent, isPending } = useUpdateStudent();

  const form = useForm<z.infer<typeof updateStudentSchema>>({
    resolver: zodResolver(updateStudentSchema), // Use updateStudentSchema here
    defaultValues: {
      name: student.name,
      age: student.age,
      gender: student.gender,
      grade: student.grade,
      schoolName: student.schoolName,
      address: student.address,
      parentName: student.parentName,
      email: student.email || "", // Use empty string instead of undefined
      number: student.number,
      secondaryNumber: student.secondaryNumber,
      branchId: student.branchId,
      joinedDate: new Date(student.enrolledDate),
      enrolledPrograms: student.StudentEnrollment.map((program) => ({
        id: program.id,
        branchProgramId: program.branchProgram.id,
        timeTableId: program.timeTable.id,
      })),
    },
  });

  const branchId = form.watch("branchId");

  const onSubmit = (values: z.infer<typeof updateStudentSchema>) => {
    updateStudent(
      { json: values, param: { id: student.id } },
      {
        onSuccess({ data }) {
          form.reset();
          router.push(`/students/${data.id}`);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-6 pb-8"
      >
        <Card className="md:min-w-xs  max-w-4xl mx-auto shadow-none">
          <CardHeader className="text-center ">
            <CardTitle className="font-semibold text-xl ">
              Update Your Student Account
            </CardTitle>
            <CardDescription>
              This brief update process guarantees that your student ID and
              personalized account details stay current.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-semibold text-accent-foreground text-xl font-space">
              Parent Information
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter a Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-2">
                    <FormLabel> Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isPending}
                        placeholder="Enter a email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Phone No.</FormLabel>
                    <FormControl>
                      <Input
                        required
                        maxLength={10}
                        disabled={isPending}
                        placeholder="Enter a phone number"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondaryNumber"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Secondary Phone No.</FormLabel>
                    <FormControl>
                      <Input
                        required
                        maxLength={10}
                        disabled={isPending}
                        placeholder="Enter a  phone number"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className="my-2" />
            <h2 className="font-semibold text-accent-foreground text-xl font-space">
              Student Information
            </h2>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter a name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> School Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter a  school name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex  gap-4 w-full">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Age</FormLabel>
                    <FormControl>
                      <Input
                        min={1}
                        disabled={isPending}
                        placeholder="Enter age"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Status " />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(Gender).map((gender, idx) => (
                            <SelectItem key={idx} value={gender}>
                              {snakeCaseToTitleCase(gender)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel>Grade</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter a grade"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter a address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="joinedDate"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-4">
                  <FormLabel>Joined Date</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card className="md:min-w-xs  max-w-4xl mx-auto shadow-none">
          <CardHeader className="">
            <CardTitle className="font-bold text-xl font-space flex items-center gap-2 ">
              <MapPin />
              <span className="">Select Branch</span>
            </CardTitle>
            <CardDescription>
              Choose your preferred skilltootr location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="branchId"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Branch " />
                      </SelectTrigger>
                      <SelectContent>
                        {branches?.map((branch) => (
                          <SelectItem
                            key={branch.id}
                            value={branch.id}
                            className="capitalize"
                          >
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {branchId && (
          <Card className="md:min-w-xs  max-w-4xl mx-auto shadow-none">
            <CardHeader className="">
              <CardTitle className="font-bold text-xl font-space flex items-center gap-2 ">
                <GraduationCap />
                <span className="">Select Program</span>
              </CardTitle>
              <CardDescription>
                Everything looks right! Simply confirm to secure your spot.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="enrolledPrograms"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <BranchProgramMultiSelect
                        isPending={isPending}
                        branchId={branchId}
                        form={form}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end md:min-w-xs  max-w-4xl mx-auto">
          <Button type="submit" disabled={isPending}>
            <ButtonLoader
              isLoading={isPending}
              label={"Update Student"}
              loadingText="Updating"
            />
          </Button>
        </div>
      </form>
    </Form>
  );
};

"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { leadSchema, updateLeadSchema } from "@/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn, snakeCaseToTitleCase } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompanyBranch, LeadSource, LeadStatus } from "@/generated/prisma";
import { useGetPrograms } from "@/features/programs/api/use-get-program";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { ButtonLoader } from "@/components/global/button-loader";
import { useModal } from "@/hooks/use-modal-store";
import { useLeadId } from "../hooks/use-lead-id";
import { useGetLead } from "../api/use-get-lead";
import { useUpdateLead } from "../api/use-update-lead";

export const UpdateLeadForm = () => {
  const { onClose } = useModal();
  const leadId = useLeadId();

  const { data } = useGetLead(leadId);

  const { mutate: updateLead, isPending } = useUpdateLead();
  const { data: programs } = useGetPrograms();

  const form = useForm<z.infer<typeof updateLeadSchema>>({
    resolver: zodResolver(updateLeadSchema),
    defaultValues: {
      number: data?.number,
      email: data?.email ?? "",
      parentName: data?.parentName ?? "",
      status: data?.status ?? undefined,
      source: data?.source ?? undefined,
      programs: data?.programs ?? undefined,
      branch: data?.branch ?? undefined,
      studentName: data?.studentName ?? "",
      address: data?.address ?? "",

      schoolName: data?.schoolName ?? "",
      grade: data?.grade ?? "",
      age: data?.age?.toString() ?? undefined,
      gender: data?.gender ?? undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof updateLeadSchema>) => {
    const finalValues = {
      ...values,
    };

    updateLead(
      { json: finalValues, param: { leadId } },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      }
    );
  };

  return (
    <Card
      className="w-full h-full border-none shadow-none
  "
    >
      <CardHeader className="flex px-6 ">
        <CardTitle className="font-bold text-xl font-space  text-center w-full">
          Update a Lead
        </CardTitle>
      </CardHeader>
      <div className="px-6">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 my-2"
          >
            <h2 className="font-semibold text-accent-foreground text-xl font-space">
              Parent Information
            </h2>

            <div className="flex  gap-4">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-4 w-full">
                    <FormLabel> Phone No.</FormLabel>
                    <FormControl>
                      <Input
                        required
                        maxLength={10}
                        disabled={isPending}
                        placeholder="Enter a number"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-4 w-full">
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
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-4">
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
            <Separator className="my-2" />
            <h2 className="font-semibold text-accent-foreground text-xl font-space">
              Student Information
            </h2>

            <FormField
              control={form.control}
              name="studentName"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-4">
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
            <div className="flex  gap-4 w-full">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-4 w-full">
                    <FormLabel> Age</FormLabel>
                    <FormControl>
                      <Input
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
                name="grade"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-4 w-full">
                    <FormLabel> Grade</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter a Grade"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-4">
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

            <div className="grid grid-cols-2 md:grid-cols-3 md:gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-4 w-full">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Status " />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(LeadStatus).map((status, idx) => (
                            <SelectItem key={idx} value={status}>
                              {snakeCaseToTitleCase(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="branch"
                render={({ field }) => (
                  <FormItem className="pl-4 md:pl-0 flex flex-col gap-4 w-full">
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Branch " />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(CompanyBranch).map((branch, idx) => (
                            <SelectItem key={idx} value={branch}>
                              {snakeCaseToTitleCase(branch)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem className=" md:col-span-1 col-span-3 flex flex-col gap-4 w-full">
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Source " />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(LeadSource).map((source, idx) => (
                            <SelectItem key={idx} value={source}>
                              {snakeCaseToTitleCase(source)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="programs"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-4 w-full">
                  <FormLabel> Interested Programs</FormLabel>
                  <FormControl>
                    <MultiSelect
                      values={field.value ?? []}
                      onValuesChange={field.onChange}
                    >
                      <MultiSelectTrigger className="w-full">
                        <MultiSelectValue placeholder="Select programs" />
                      </MultiSelectTrigger>
                      <MultiSelectContent>
                        {programs?.map((program) => (
                          <MultiSelectItem
                            value={program.name}
                            key={program.id}
                            className="capitalize"
                          >
                            {program.name}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectContent>
                    </MultiSelect>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-2" />

            <div className="flex items-center  gap-4 ">
              <Button variant={"secondary"} type="button" className={"flex-1"}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="flex-1">
                <ButtonLoader
                  label="Update lead"
                  loadingText="Updating"
                  isLoading={isPending}
                />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
};

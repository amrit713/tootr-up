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
import { followUpSchema } from "@/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { useModal } from "@/hooks/use-modal-store";
import { DatePicker } from "@/components/global/date-picker";
import { FollowUpStatus, Priority, UserStatus } from "@/generated/prisma/enums";
import { Textarea } from "@/components/ui/textarea";
import { ButtonLoader } from "@/components/global/button-loader";
import { useCreateFollowUp } from "../api/use-create-follow-up";
import { useLeadId } from "@/features/leads/hooks/use-lead-id";
import { useGetFilterUsers } from "@/features/auth/api/get-filter-users";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader } from "lucide-react";

export const CreateFollowUpForm = () => {
  const { onClose } = useModal();
  const leadId = useLeadId();
  const { mutate: createFollowUp, isPending } = useCreateFollowUp();

  const { data: users, isLoading } = useGetFilterUsers({
    status: UserStatus.ACTIVE,
  });

  const form = useForm<z.infer<typeof followUpSchema>>({
    resolver: zodResolver(followUpSchema),
    defaultValues: {
      leadId,
    },
  });

  const onSubmit = (values: z.infer<typeof followUpSchema>) => {
    const finalValues = {
      ...values,
      leadId,
    };
    createFollowUp(
      { json: finalValues },
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
      <CardHeader>
        <CardTitle className="font-bold text-xl font-space  text-center w-full">
          Create a new follow-up
        </CardTitle>
        <CardDescription aria-describedby={undefined}></CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 my-2"
          >
            <FormField
              control={form.control}
              name="due_date"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-4">
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <DatePicker {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-4 w-full">
                    <FormLabel> Priority</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Status " />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(Priority).map((status, idx) => (
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
                name="status"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-4 w-full">
                    <FormLabel> Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Status " />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(FollowUpStatus).map((status, idx) => (
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
            </div>
            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem className="  flex flex-col gap-4 w-full">
                  <FormLabel>Assign To</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Assign Lead to " />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoading && (
                          <div className="w-full h-15 flex items-center justify-center">
                            <Loader className="animate-spin size-5" />
                          </div>
                        )}
                        {users?.map((user) => (
                          <SelectItem
                            key={user.id}
                            value={user.id}
                            className="capitalize"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="size-6 hover:opacity-75 transition border border-netural-400  ">
                                <AvatarFallback className="bg-primary/10 font-medium text-primary dark:text-white flex items-center justify-center ">
                                  {user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <p className="capitalize text-sm font-medium">
                                {user.name}{" "}
                              </p>
                            </div>
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
              name="remark"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-4">
                  <FormLabel>Remark</FormLabel>
                  <FormControl>
                    <Textarea
                      // disabled={isPending}
                      placeholder="Enter a remark"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Separator className="my-2" />

            <div className="flex items-center  gap-4 ">
              <Button
                variant={"secondary"}
                type="button"
                className={cn("flex-1")}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="flex-1">
                <ButtonLoader
                  label="create follow-up"
                  loadingText="creating"
                  isLoading={isPending}
                />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

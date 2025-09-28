"use client";

import { useForm } from "react-hook-form";
import z from "zod";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { ButtonLoader } from "@/components/global/button-loader";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useCreateProgram } from "../api/use-create-program";
import { useModal } from "@/hooks/use-modal-store";

const programSchema = z.object({
  name: z.string(),
});

export const CreateProgramForm = () => {
  const { mutate: createProgram, isPending } = useCreateProgram();

  const { onClose } = useModal();

  const form = useForm<z.infer<typeof programSchema>>({
    resolver: zodResolver(programSchema),
    defaultValues: {},
  });

  const onSubmit = (values: z.infer<typeof programSchema>) => {
    const finalValues = {
      ...values,
    };

    createProgram(
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
      <CardHeader className="flex px-6 ">
        <CardTitle className="font-bold text-xl font-space  text-center w-full">
          Add New Program
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 my-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-4 w-full">
                  <FormLabel> Program Name</FormLabel>
                  <FormControl>
                    <Input
                      required
                      disabled={isPending}
                      placeholder="eg: Coding, Arts"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-2" />

            <div className="flex items-center  gap-4 ">
              <Button
                variant={"secondary"}
                type="button"
                className={"flex-1"}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="flex-1">
                <ButtonLoader
                  label="create program"
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<(typeof client.api.students)[":id"]["$patch"]>;
type RequestType = InferRequestType<(typeof client.api.students)[":id"]["$patch"]>;
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.students[":id"]["$patch"]({ json, param });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Student updated");
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

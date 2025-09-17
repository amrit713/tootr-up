import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { leadSchema } from "@/schema";

type ResponseType = InferResponseType<(typeof client.api.followups)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.followups)["$post"]>;

export const useCreateFollowUp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.followups.$post({
        json,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      return await response.json();
    },
    onSuccess: (data) => {
      toast.success("follow up created");
      queryClient.invalidateQueries({ queryKey: ["followUps"] });
      queryClient.invalidateQueries({ queryKey: ["lead"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

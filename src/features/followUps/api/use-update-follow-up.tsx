import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.followups)[":followUpId"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.followups)[":followUpId"]["$patch"]
>;

export const useUpdateFollowUp = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json, param }) => {
      const response = await client.api.followups[":followUpId"]["$patch"]({
        json,
        param,
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("follow up updated");
      queryClient.invalidateQueries({ queryKey: ["followUps"] });
      queryClient.invalidateQueries({ queryKey: ["lead"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
};

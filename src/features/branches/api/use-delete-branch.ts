import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";


type ResponseType = InferResponseType<(typeof client.api.branches)[":branchId"]["$delete"]>;
type RequestType = InferRequestType<(typeof client.api.branches)[":branchId"]["$delete"]>;

export const useDeleteBranch = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ param }) => {
            const response = await client.api.branches[":branchId"]["$delete"]({

                param
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("deleted  branch");
            queryClient.invalidateQueries({ queryKey: ["branches"] });

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};

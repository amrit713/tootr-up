import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";


type ResponseType = InferResponseType<(typeof client.api.branches)[":branchId"]["branch-programs"]["$post"]>;
type RequestType = InferRequestType<(typeof client.api.branches)[":branchId"]["branch-programs"]["$post"]>;

export const useCreateBranchProgram = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.branches[":branchId"]["branch-programs"]["$post"]({
                json,
                param
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: ({ data }) => {
            toast.success("added program to branch");
            queryClient.invalidateQueries({ queryKey: ["branchProgram", data.branchId] });

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};

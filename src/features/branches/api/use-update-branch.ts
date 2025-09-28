import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";


type ResponseType = InferResponseType<(typeof client.api.branches)[":branchId"]["$patch"]>;
type RequestType = InferRequestType<(typeof client.api.branches)[":branchId"]["$patch"]>;

export const useUpdateBranch = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({ json, param }) => {
            const response = await client.api.branches[":branchId"]["$patch"]({
                param,
                json,
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error);
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("branch up updated");
            queryClient.invalidateQueries({ queryKey: ["branches"] });

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return mutation;
};
